import express from 'express'
import { Task } from 'middleware-setup'

export default class extends Task {
  async execute() {
    __app.server = express()
  }
}
