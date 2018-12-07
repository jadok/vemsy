const { Task } = require('middleware-setup')
const pkg = require('../../package.json')

module.exports = class extends Task {
  async execute() {
    // Set process title
    app.title = process.env.APP_NAME || pkg.name;
    console.log(app.title, 'Lifting...')
    // Bind server to port
    app.server.set('port', app.configs.port || 1337);
    app.server.listen(app.server.get('port'));
  }
}
