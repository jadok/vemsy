const {
  type
} = require('vemsy');

const TemplateDefault = require('../template/default.js');

module.exports = new type.Page('/', TemplateDefault);