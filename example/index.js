// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
const a = require('./.babelrc')

require('@babel/register')()

// Import the rest of our application.
module.exports = require('./app/index.js')
