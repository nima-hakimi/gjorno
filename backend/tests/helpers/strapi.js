const Strapi = require('strapi');
const http = require('http');


let instance;

/**
 * This function creates an instance of the strapi backend application
 * @returns strapi - an instance of strapi backend
 */
async function setupStrapi() {
  if (!instance) {
    /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load()
    instance = strapi; // strapi is global now
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(instance.app.callback());
  }
  //here is the strapi instance returned, which is critical in test-runs
  return instance;
}
module.exports = { setupStrapi };