import { Task } from 'middleware-setup'

import filePathToPath from '../utils/path.js'

export default class extends Task {
  async execute() {
    global.__app.theme = {
      motor: __app.configs.files.theme_motor,
      name: __app.configs.files.theme_name,
      style: { config: __app.configs.files.theme_style },
    }
    const viewDir = filePathToPath(
      __app.configs.files.app_path.themes
      + '/' + __app.configs.files.theme_name
    )

    if (__app.theme.motor === 'twig') {
      __app.server.set("twig options", {
        allow_async: true, // Allow asynchronous compiling
        strict_variables: false
      });
    }
    __app.server.set('views', viewDir);
    __app.server.set('view engine', __app.theme.motor); // register the template engine
  }
}
