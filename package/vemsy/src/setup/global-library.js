const { Task } = require('middleware-setup')
const t = require('../type/index.js')

module.exports = class extends Task {
  async execute() {
    global.t = t
  }
}
