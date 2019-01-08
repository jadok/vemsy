'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var merge = _interopDefault(require('deepmerge'));
var includesAll = _interopDefault(require('include-all'));
var middlewareSetup = require('middleware-setup');
var path = require('path');
var express = _interopDefault(require('express'));
var typy = require('typy');
var morgan = _interopDefault(require('morgan'));
var winston = require('winston');
var fs = _interopDefault(require('fs'));
var util = _interopDefault(require('util'));
var markdown = _interopDefault(require('markdown'));

var files = {
  "app_path": {
    "contents": "./app/contents",
    "public": "./public",
    "themes": "./app/themes",
    "views": "./app/views"
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

const pathAppConfigs = path.join(process.cwd(), 'app', 'config');
class config extends middlewareSetup.Task {
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
      global.app.configs = merge(coreConfigs, appConfigs);
      global.app.configs.name = global.app.configs.name || require(path.join(process.cwd(), 'package.json')).name;
    } catch (err) {
      throw new Error(err);
    }
  }

}

class express$1 extends middlewareSetup.Task {
  async execute() {
    app.server = express();
  }

}

class expressMiddleware extends middlewareSetup.Task {
  constructor(middlewares) {
    super(middlewares);
    this.middlewares = middlewares;
  }

  async execute() {
    if (typeof app.server === 'undefined') {
      throw new Error('Server not up.');
    }

    this.middlewares.forEach(middleware => {
      t(middleware).isExpressMiddleware ? app.server.use(middleware) : app.server.use(middleware());
    });
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

typy.addCustomTypes({
  isExpressMiddleware: middlewareTypeCheck
});

class globalLibrary extends middlewareSetup.Task {
  async execute() {
    global.t = typy.t;
  }

}

class lift extends middlewareSetup.Task {
  async execute() {
    // Set process title
    app.title = process.env.APP_NAME || app.configs.name || '';
    console.log(app.title, 'Lifting...'); // Bind server to port

    app.server.set('port', app.configs.port || 1337);
    app.server.listen(app.server.get('port'));
  }

}

class logger extends middlewareSetup.Task {
  async execute() {
    const logger = winston.createLogger({
      transports: [new winston.transports.File(app.configs.logs.winston.file), new winston.transports.Console(app.configs.logs.winston.console)],
      exitOnError: false
    });
    logger.stream = {
      write: message => logger.info(message)
    };
    app.server.use(morgan("combined", {
      "stream": logger.stream
    }));
  }

}

global.app = {};
var setup = {
  config,
  express: express$1,
  expressMiddleware,
  globalLibrary,
  lift,
  logger
};

const filePathToPath = filePath => path.join(process.cwd(), ...filePath.split('/'));

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

const routingFileMiddleware = viewPath => (req, res, next) => {
  if (typeof req.variables === 'undefined') {
    req.variables = {};
  } // use the middleware if no file extension is provided


  if (req.originalUrl.indexOf('.') === -1) {
    // generate a windows readable path
    req.variables.file = viewPath + req.originalUrl.toString() + '.md';
  } else {
    req.variables.assetFile = req.originalUrl.toString();
  }

  return next();
};

const configureMiddleware = () => routingFileMiddleware(app.configs.files.app_path.contents);

var routingFile = {
  configureMiddleware,
  routingFileMiddleware
};

var middleware = {
  data,
  markdown: markdown$1,
  render: renderMiddleware,
  routingFile: routingFile.configureMiddleware
};

var index = {
  middleware,
  runner: middlewareSetup.runner,
  setup,
  Task: middlewareSetup.Task
};

module.exports = index;
//# sourceMappingURL=index.cjs.js.map
