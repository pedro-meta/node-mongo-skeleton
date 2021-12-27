/* eslint-disable camelcase */
const supertest = require('supertest');
const sinon = require('sinon');
const user = require('../src/server/models/user.model');
const refreshTokenModel = require('../src/server/models/refreshToken.model');
const tokenBlackListModel =
      require('../src/server/models/tokenBlackList.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = require('../src/app');
const faker = require('faker');

const first_name = faker.name.firstName();
const last_name = faker.name.lastName();
const email = faker.internet.email();

const userLogin = {
  email,
  password: '12345',
};

const userData = {
  first_name,
  last_name,
  email,
  password: '12345',
  repeat_password: '12345',
  type_of: 'User',
  toJSON: function() {
    return {
      email,
      first_name,
      last_name,
    };
  },
};

before((done) => {
  sinon.stub(refreshTokenModel, 'findOneAndUpdate').returns({id: 'any_id'});
  sinon.stub(userData, 'toJSON').returns(userLogin);
  sinon.stub(user, 'findOne').callsFake(() => {
    return {
      ...userData,
      select: function() {
        return userData;
      },
    };
  });
  sinon.stub(user, 'find').callsFake(() => {
    return {
      ...userData,
      select: function() {
        return [userData];
      },
    };
  });
  sinon.stub(tokenBlackListModel, 'findOne').callsFake(() => {
    return false;
  });
  done();
});

// after((done) => {
//   app.close(done);
// });

describe('Users Test', () => {
  it('Should Authenticate', async () => {
    sinon.stub(jwt, 'sign').callsFake(() => {
      return 'SIGNED';
    });

    sinon.stub(bcrypt, 'compareSync').callsFake(() => {
      return true;
    });

    await supertest(app).
        post('/user/auth').
        send(userLogin).
        expect(200);
  });
  it('Should response the GET method', async () => {
    sinon.stub(jwt, 'verify').callsFake(() => {
      return true;
    });
    await supertest(app).get('/user').expect(200);
  });
  it('Should response the POST method', async () => {
    sinon.stub(user, 'create').callsFake(() => {
      return {
        userData,
      };
    });
    await supertest(app)
        .post('/user')
        .send({
          body: userData,
        })
        .expect(200);
  });
});
