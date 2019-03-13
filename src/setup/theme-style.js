import { Task } from 'middleware-setup'
import ListStyleManagers from '../style/index.js'
import Manager from '../style/manager.js'

const implementStyle = (manager, styleConfig, managers) => {
  styleConfig.forEach(element => {
    if (!!managers[element]) {
      manager.compilers.push(new managers[element]())
    }
  })
}

export default class extends Task {
  async execute() {
    __app.theme.style.manager = new Manager(
      __app.configs.files.app_path.themes + '/' + __app.configs.files.theme_name,
      __app.configs.files.app_path.public
    )
    implementStyle(__app.theme.style.manager, __app.theme.style.config, ListStyleManagers)
  }
}
