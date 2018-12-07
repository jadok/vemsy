const express = require('express')
const { Task } = require('middleware-setup')

module.exports = class extends Task {
  async execute() {
    app.server = express()
  }
}
