const fs = require('fs');
const { setupStrapi } = require('./helpers/strapi');
const chai = require('chai');
const expect = chai.expect;

/**
 * Test environment for integration testing of strapi back-end
 * Here the only test is making sure the strapi instance is defined
 */

/**
 * Method for setting up strapi instance before the test run
 */
before((done) => {
  setupStrapi();
  done();
});

/**
 * Method for deleting content of database after each run, [WIP]
 */
after((done) => {
  const dbSettings = strapi.config.get('database.connections.default.settings');
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  done();
});

/**
 * Checks that strapi instance is defined
 */
it('strapi is defined', (done) => {
  expect(strapi).to.exist;
  done()
});
