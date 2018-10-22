import { Express } from 'express'

import View from './view'

class Twig extends View {
  public setEngine(app: Express, viewPath: string) {
    app.set('views', viewPath);
    app.set('view engine', 'twig');
    // This section is optional and can be used to configure twig.
    app.set('twig options', {
      allow_async: true, // Allow asynchronous compiling
      strict_variables: false
    });
  }
}

export default Twig
