import { Task } from 'middleware-setup'

export default class extends Task {
  async execute() {
    // Set process title
    __app.title = process.env.APP_NAME || __app.configs.name || '';
    console.log(__app.title, 'Lifting...')
    // Bind server to port
    __app.server.set('port', __app.configs.port || 1337);
    __app.server.listen(__app.server.get('port'));
  }
}
