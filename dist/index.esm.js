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

var files = {app_path:{contents:"./app/contents",public:"./public",themes:"./app/themes",views:"views"}};

var logs = {winston:{file:{level:"info",filename:"./logs/app.log",handleExceptions:!0,json:!0,maxsize:5242880,maxFiles:5,colorize:!1},console:{level:"debug",handleExceptions:!0,json:!1,colorize:!0}}};

const pathAppConfigs=join(process.cwd(),"app","config");class config extends Task{async execute(){try{const a=includesAll({dirname:pathAppConfigs,filter:/(.+)\.js$/,excludeDirs:/^\.(git|svn)$/});global.__app.configs=merge({files,logs},a),global.__app.configs.name=global.__app.configs.name||require(join(process.cwd(),"package.json")).name;}catch(a){throw new Error(a)}}}

class express$1 extends Task{async execute(){__app.server=express();}}

class expressMiddleware extends Task{constructor(a){super(a),this.middlewares=a;}async execute(){if("undefined"==typeof __app.server)throw new Error("Server not up.");this.middlewares.forEach(a=>{t(a).isExpressMiddleware?__app.server.use(a):__app.server.use(a());});}}

class Page{constructor(a="",b=null,c=[],d=""){this.route=a,this.plugins=c,this.template=b,this.name=d;}}

class Template{constructor(a="",b=[]){this.filename=a,this.plugins=b;}}

const ARGUMENT_NAMES=/([^\s,]+)/g,STRIP_COMMENTS=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,STANDARD_FUNC_DEFINITION=/.*\)[\s]+{/mg,isAnonymousSingleParameter=a=>{const b=a.indexOf("(")+1,c=a.indexOf(")"),d=a.indexOf("=>"),e=a.match(STANDARD_FUNC_DEFINITION);return -1===d&&null===e?"":-1!==d&&(d<c||0>c)?a.slice(0,d).trim():a.slice(b,c)},getParamNames=a=>{const b=a.toString().replace(STRIP_COMMENTS,""),c=isAnonymousSingleParameter(b).match(ARGUMENT_NAMES);return null===c?[]:c};

/**
 * Some people implements express middleware with differents form express middleware.
 * Some due to their code style don't write parameter name if the parameter is not used
 *  - like (, res)
 */const PARAMS_VALIDATOR={req:["","req","request"],res:["","res","response",void 0],next:["next",void 0]},middlewareTypeCheck=a=>{const b=getParamNames(a);return -1!==PARAMS_VALIDATOR.req.indexOf(b[0])&&-1!==PARAMS_VALIDATOR.res.indexOf(b[1])&&-1!=PARAMS_VALIDATOR.next.indexOf(b[2])};

const templateTypeCheck=a=>a instanceof Template&&a.plugins.reduce((a,b)=>a&&middlewareTypeCheck(b),!0)&&"string"==typeof a.filename;

const pageTypeCheck=a=>a.template instanceof Template&&templateTypeCheck(a.template)&&a.plugins.reduce((a,b)=>a&&middlewareTypeCheck(b),!0)&&"string"==typeof a.route;

addCustomTypes({isExpressMiddleware:middlewareTypeCheck,isPage:pageTypeCheck,isTemplate:templateTypeCheck});

const type={Page,Template};

class globalLibrary extends Task{async execute(){global.t=t$1;}}

class lift extends Task{async execute(){// Set process title
// Bind server to port
__app.title=process.env.APP_NAME||__app.configs.name||"",console.log(__app.title,"Lifting..."),__app.server.set("port",__app.configs.port||1337),__app.server.listen(__app.server.get("port"));}}

const filePathToPath=a=>join(process.cwd(),...a.split("/"));

class themeInit extends Task{async execute(){global.__app.theme={motor:__app.configs.files.theme_motor,name:__app.configs.files.theme_name};const a=filePathToPath(__app.configs.files.app_path.themes+"/"+__app.configs.files.theme_name+"/"+__app.configs.files.app_path.views);__app.server.set("twig options",{allow_async:!0,// Allow asynchronous compiling
strict_variables:!1}),__app.server.set("views",a),__app.server.set("view engine",__app.theme.motor);}}

const includesAll$1=require("include-all");class themePages extends Task{async execute(){const a=join(__app.configs.files.app_path.themes+"/"+__app.configs.files.theme_name),b={...global.__app},c=includesAll$1({dirname:a,filter:/(.+)\.js$/,excludeDirs:/^\.(git|svn)$/});global.__app=b,global.__app.theme.pages=Object.keys(c.pages).map(a=>(c.pages[a].name=a,c.pages[a]));}}

class logger extends Task{async execute(){const a=createLogger({transports:[new transports.File(__app.configs.logs.winston.file),new transports.Console(__app.configs.logs.winston.console)],exitOnError:!1});a.stream={write:b=>a.info(b)},__app.server.use(morgan("combined",{stream:a.stream}));}}

global.__app={};var setup = {config,express: express$1,expressMiddleware,globalLibrary,lift,logger,themeInit,themePages};

const asyncHandler=a=>(b,c,d)=>Promise.resolve(a(b,c,d)).catch(d);

const readFile=util.promisify(fs.readFile),dataMiddleware=async(a,b,c)=>{if(!a.variables.file)return c();try{const b=a.variables.file,c=await readFile(filePathToPath(b),"utf-8");a.variables.data=c;}catch(b){console.error(b,a.variables,a.variables.file),a.variables.data="";}return c()};var data = asyncHandler(dataMiddleware);

const markdownMiddleware=(a,b,c)=>{if("undefined"!=typeof a.variables.data){const b=markdown.markdown.toHTML(a.variables.data.toString());a.variables.markdown=b;}return c()};var markdown$1 = asyncHandler(markdownMiddleware);

const renderMiddleware=(a,b)=>{"undefined"==typeof a.variables.markdown?(b.status(404),b.send("Error file not found")):(b.set("Content-Type","text/html"),b.send(a.variables.markdown));};

const renderTemplateMiddleware=(a,b)=>{const c=a.hidden_variables.pages[0].template.filename+".html.twig";b.render(c,a.variables);};

const descPageRouteOrder=(c,a)=>a.route.length-c.route.length;/**
 * Get the list of defined path matching the route.
 *
 * @param {string[]} pages
 *   List of paths
 * @param {string} route
 *   actual route to test
 *
 * @return
 *   list of defined path matching the route
 */const testRoutes=(a,b)=>{const c=a.reduce((a,c)=>{const d=new RegExp(c.route),e=d.test(b);return e&&a.push(c),a},[]);return c.sort(descPageRouteOrder)};

const routingTheme=(a,b,c)=>("undefined"!=typeof a.hidden_variables&&(a.hidden_variables.pages=testRoutes(__app.theme.pages,a.path)),c());

const routingFileMiddleware=a=>(b,c,d)=>("undefined"==typeof b.variables&&(b.variables={}),"undefined"==typeof b.hidden_variables&&(b.hidden_variables={}),-1===b.originalUrl.indexOf(".")?b.variables.file=a+b.originalUrl.toString()+".md":b.variables.assetFile=b.originalUrl.toString(),d());const configureMiddleware=()=>routingFileMiddleware(__app.configs.files.app_path.contents);

var middleware = {data,markdown: markdown$1,render: renderMiddleware,renderTheme: renderTemplateMiddleware,routingFile:configureMiddleware,routingTheme};

var index = {middleware,runner,setup,type,Task};

export default index;
