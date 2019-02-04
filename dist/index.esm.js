import merge from 'deepmerge';
import includesAll from 'include-all';
import { Task, runner } from 'middleware-setup';
import { join } from 'path';
import express from 'express';
import { addCustomTypes, t as t$1 } from 'typy';
import morgan from 'morgan';
import { createLogger, transports } from 'winston';
import fs from 'fs';
import util from 'util';
import markdown from 'markdown';

var files = {
  "app_path": {
    "contents": "./app/contents",
    "public": "./public",
    "themes": "./app/themes",
    "views": "views"
  }
};

var logs = {
  "winston": {
    "file": {
      "level": "info",
      "filename": "./logs/app.log",
      "handleExceptions": true,
      "json": true,
      "maxsize": 5242880,
      "maxFiles": 5,
      "colorize": false
    },
    "console": {
      "level": "debug",
      "handleExceptions": true,
      "json": false,
      "colorize": true
    }
  }
};

const pathAppConfigs = join(process.cwd(), 'app', 'config');
class config extends Task {
  async execute() {
    try {
      const coreConfigs = {
        files,
        logs
      };
      const appConfigs = includesAll({
        dirname: pathAppConfigs,
        filter: /(.+)\.js$/,
        excludeDirs: /^\.(git|svn)$/
      });
      global.__app.configs = merge(coreConfigs, appConfigs);
      global.__app.configs.name = global.__app.configs.name || require(join(process.cwd(), 'package.json')).name;
    } catch (err) {
      throw new Error(err);
    }
  }

}

class express$1 extends Task {
  async execute() {
    __app.server = express();
  }

}

class expressMiddleware extends Task {
  constructor(middlewares) {
    super(middlewares);
    this.middlewares = middlewares;
  }

  async execute() {
    if (typeof __app.server === 'undefined') {
      throw new Error('Server not up.');
    }

    this.middlewares.forEach(middleware => {
      t(middleware).isExpressMiddleware ? __app.server.use(middleware) : __app.server.use(middleware());
    });
  }

}

class Page {
  constructor(route = '', template = null, plugins = [], name = '') {
    this.route = route;
    this.plugins = plugins;
    this.template = template;
    this.name = name;
  }

}

class Template {
  constructor(filename = '', plugins = []) {
    this.filename = filename;
    this.plugins = plugins;
  }

}

const ARGUMENT_NAMES = /([^\s,]+)/g;
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const STANDARD_FUNC_DEFINITION = /.*\)[\s]+{/mg;

const isAnonymousSingleParameter = fnStr => {
  const firstBracket = fnStr.indexOf('(') + 1;
  const lastBracket = fnStr.indexOf(')');
  const anonymousDefinition = fnStr.indexOf('=>');
  const standardDefinition = fnStr.match(STANDARD_FUNC_DEFINITION);

  if (anonymousDefinition === -1 && standardDefinition === null) {
    return '';
  }

  if (anonymousDefinition !== -1 && (anonymousDefinition < lastBracket || lastBracket < 0)) {
    return fnStr.slice(0, anonymousDefinition).trim();
  }

  return fnStr.slice(firstBracket, lastBracket);
};

const getParamNames = func => {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  const result = isAnonymousSingleParameter(fnStr).match(ARGUMENT_NAMES);
  return result === null ? [] : result;
};

/**
 * Some people implements express middleware with differents form express middleware.
 * Some due to their code style don't write parameter name if the parameter is not used
 *  - like (, res)
 */

const PARAMS_VALIDATOR = {
  req: ['', 'req', 'request'],
  res: ['', 'res', 'response', undefined],
  next: ['next', undefined]
};

const middlewareTypeCheck = input => {
  const params = getParamNames(input);

  if (PARAMS_VALIDATOR.req.indexOf(params[0]) === -1) {
    return false;
  }

  if (PARAMS_VALIDATOR.res.indexOf(params[1]) === -1) {
    return false;
  }

  return PARAMS_VALIDATOR.next.indexOf(params[2]) != -1;
};

const templateTypeCheck = input => {
  return input instanceof Template && input.plugins.reduce((acc, currPlugins) => acc && middlewareTypeCheck(currPlugins), true) && typeof input.filename === "string";
};

const pageTypeCheck = input => {
  return input.template instanceof Template && templateTypeCheck(input.template) && input.plugins.reduce((acc, currPlugins) => acc && middlewareTypeCheck(currPlugins), true) && typeof input.route === "string";
};

addCustomTypes({
  isExpressMiddleware: middlewareTypeCheck,
  isPage: pageTypeCheck,
  isTemplate: templateTypeCheck
});

const type = {
  Page,
  Template
};

class globalLibrary extends Task {
  async execute() {
    global.t = t$1;
  }

}

class lift extends Task {
  async execute() {
    // Set process title
    __app.title = process.env.APP_NAME || __app.configs.name || '';
    console.log(__app.title, 'Lifting...'); // Bind server to port

    __app.server.set('port', __app.configs.port || 1337);

    __app.server.listen(__app.server.get('port'));
  }

}

const filePathToPath = filePath => join(process.cwd(), ...filePath.split('/'));

class themeInit extends Task {
  async execute() {
    global.__app.theme = {
      motor: __app.configs.files.theme_motor,
      name: __app.configs.files.theme_name
    };
    const viewDir = filePathToPath(__app.configs.files.app_path.themes + '/' + __app.configs.files.theme_name + '/' + __app.configs.files.app_path.views);

    if (__app.theme.motor === 'twig') {
      __app.server.set("twig options", {
        allow_async: true,
        // Allow asynchronous compiling
        strict_variables: false
      });
    }

    __app.server.set('views', viewDir);

    __app.server.set('view engine', __app.theme.motor); // register the template engine

  }

}

const includesAll$1 = require('include-all');
class themePages extends Task {
  async execute() {
    const themePagesDir = join(__app.configs.files.app_path.themes + '/' + __app.configs.files.theme_name);
    const tmpApp = { ...global.__app
    };
    const pages = includesAll$1({
      dirname: themePagesDir,
      filter: /(.+)\.js$/,
      excludeDirs: /^\.(git|svn)$/
    });
    global.__app = tmpApp;
    global.__app.theme.pages = Object.keys(pages.pages).map(pageName => {
      pages.pages[pageName].name = pageName;
      return pages.pages[pageName];
    });
  }

}

class logger extends Task {
  async execute() {
    const logger = createLogger({
      transports: [new transports.File(__app.configs.logs.winston.file), new transports.Console(__app.configs.logs.winston.console)],
      exitOnError: false
    });
    logger.stream = {
      write: message => logger.info(message)
    };

    __app.server.use(morgan("combined", {
      "stream": logger.stream
    }));
  }

}

global.__app = {};
var setup = {
  config,
  express: express$1,
  expressMiddleware,
  globalLibrary,
  lift,
  logger,
  themeInit,
  themePages
};

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const readFile = util.promisify(fs.readFile);

const dataMiddleware = async (req, res, next) => {
  if (!req.variables.file) {
    return next();
  }

  try {
    const filePath = req.variables.file;
    const data = await readFile(filePathToPath(filePath), 'utf-8');
    req.variables.data = data;
  } catch (e) {
    console.error(e, req.variables, req.variables.file);
    req.variables.data = '';
  }

  return next();
};

var data = asyncHandler(dataMiddleware);

const markdownMiddleware = (req, res, next) => {
  if (typeof req.variables.data !== 'undefined') {
    const rendered = markdown.markdown.toHTML(req.variables.data.toString());
    req.variables.markdown = rendered;
  }

  return next();
};

var markdown$1 = asyncHandler(markdownMiddleware);

const renderMiddleware = (req, res) => {
  if (typeof req.variables.markdown !== 'undefined') {
    res.set('Content-Type', 'text/html');
    res.send(req.variables.markdown);
  } else {
    res.status(404);
    res.send('Error file not found');
  }
};

const renderTemplateMiddleware = (req, res) => {
  const template = req.hidden_variables.pages[0].template.filename + '.html.twig';
  res.render(template, req.variables);
};

const descPageRouteOrder = (a, b) => b.route.length - a.route.length;
/**
 * Get the list of defined path matching the route.
 *
 * @param {string[]} pages
 *   List of paths
 * @param {string} route
 *   actual route to test
 *
 * @return
 *   list of defined path matching the route
 */

const testRoutes = (pages, route) => {
  const matchingRoutes = pages.reduce((acc, page) => {
    const reg = new RegExp(page.route);
    const t = reg.test(route);

    if (t) {
      acc.push(page);
    }

    return acc;
  }, []);
  return matchingRoutes.sort(descPageRouteOrder);
};

const routingTheme = (req, res, next) => {
  if (typeof req.hidden_variables !== 'undefined') {
    req.hidden_variables.pages = testRoutes(__app.theme.pages, req.path);
  }

  return next();
};

const stat = util.promisify(fs.stat);
const routingFileMiddleware = viewPath => async (req, res, next) => {
  if (typeof req.variables === 'undefined') {
    req.variables = {};
  }

  if (typeof req.hidden_variables === 'undefined') {
    req.hidden_variables = {};
  } // use the middleware if no file extension is provided


  if (req.originalUrl.indexOf('.') === -1) {
    // generate a windows readable path
    req.variables.file = viewPath + req.originalUrl.toString();

    try {
      const stats = await stat(req.variables.file + '/');
      req.variables.file = stats.isDirectory() ? join(viewPath + req.originalUrl.toString(), 'README.md') : viewPath + req.originalUrl.toString() + '.md';
    } catch (e) {
      req.variables.file = viewPath + req.originalUrl.toString() + '.md';
    }
  } else {
    req.variables.assetFile = req.originalUrl.toString();
  }

  return next();
};
const configureMiddleware = () => routingFileMiddleware(__app.configs.files.app_path.contents);

var middleware = {
  data,
  markdown: markdown$1,
  render: renderMiddleware,
  renderTheme: renderTemplateMiddleware,
  routingFile: configureMiddleware,
  routingTheme
};

var index = {
  middleware,
  runner,
  setup,
  type,
  Task
};

export default index;
//# sourceMappingURL=index.esm.js.map
