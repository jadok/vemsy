import { Task } from 'middleware-setup'
import t from '../type/index.js'

export default class extends Task {
  async execute() {
    global.t = t
  }
}
