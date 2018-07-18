/**
 * Provide a JS endpoint to your TS application.
 * @see {@link https://medium.com/@dupski/debug-typescript-in-vs-code-without-compiling-using-ts-node-9d1f4f9a94a} for further information.
 */

require('ts-node').register();
// Now we can load and run ./my-typescript-code.ts...
require('./core/index');
