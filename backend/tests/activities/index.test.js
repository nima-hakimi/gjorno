const { setupStrapi } = require('../helpers/strapi');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('console');
const expect = chai.expect;
chai.use(chaiHttp);

/**
 * Test environment for testing activities endpoints.
 * Testing libraries are mocha, and chai http for http-requests
 */

let app;

/**
 * Sets ut strapi instance, waits until promise resolved, which is why 
 * mocha timeout is set to 30 seconds
 */
before(async () => {
  app = await setupStrapi();
});

/**
 * Deletes every entry in aktivitets collection in db.
 * Clears for new testruns
 */
after(async () => {
  await strapi.query('aktivitet').delete({})
});

describe('test POST endpoint', () => {
  it('creates an aktivitet, should return 200', (done) => {
    chai
        .request(app.server)
        .post('/aktivitets')
        .send({
            "name": "Test",
            "description": "test description",
        })
        .end((error, response) => {
            expect(response).to.have.status(200);
            done()
        })
  })
})

describe('GET/ endpoint', () => {
  it('tests the get endpoint', (done) => {
    chai
        .request(app.server)
        .get('/aktivitets')
        .end((error, response) => {
            expect(response).to.have.status(200)
            done()
        })
  })
})

describe('Tests the get endpoint on name', () => {
  it('gets the posted activity on name', (done) => {
    chai
        .request(app.server)
        .get('/aktivitets?name=Test')
        .end((error, response) => {
            expect(response).to.have.status(200)
            expect(response.body).to.be.an('array')
            done()
        })
  })
})

describe('delete endpoint', () => {
  it('should delete activity on name', (done) => {
    const res = strapi.query('aktivitet').delete({name: "Test"})
        .then((error, response) => {
          console.log(response)
          assert(response[0].name == "Test")
        })
    done()
  })
})





