const { setupStrapi } = require('../helpers/strapi');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

/**
 * Test environment for testing the user entity
 */

let app;

/**
 * Sets up the strapi instance which is needed for access to queries
 * and the app.server instance chai uses
 */
before(async () => {
  app = await setupStrapi();
});

/**
 * Some basic user data for testing
 */

const User = {
    username: "moelester",
    firstname: "Moe",
    lastname: "Lester",
    password: "hughjass",
    email: "moe.lester@gmail.com",
    provider: "local",
    logged_activities: [],
}

/**
 * Method which is run after each and every test.
 * Makes sure to clear the db by using custom mongoose query
 */
after(async () => {
  //deletes instance after testrun
  await strapi.query('user', 'users-permissions').model.deleteMany({}, (err, result) => {
    if (err) {
      console.log("Could not clear db")
    }
  })
});

describe('test user endpoints in database', () => {
  
  it('creates user at auth/local/register endpoint', done => {
    chai
      .request(app.server)
      .post('/auth/local/register')
      .send(User)
      .end((error, response) => {
        expect(response).to.have.status(200)
        expect(response.body).to.be.an('object')
        expect(response.body).to.have.property('jwt')
        done()
      })
  })

  it('logins with user credentials, should return jwt token', done => {
    chai
      .request(app.server)
      .post('/auth/local')
      .send({
        "identifier": User.email,
        "password": User.password
      })
      .end((error, response) => {
        expect(response).to.have.status(200)
        expect(response.body).to.have.property('jwt')
        expect(response.body).to.be.an('object')
        done()
      })
  })
})

