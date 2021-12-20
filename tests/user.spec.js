const request = require("supertest");
const supertest = require("supertest");
const sinon = require("sinon");
const user = require("../src/server/models/user.model");
const tokenBlackListModel = require("../src/server/models/tokenBlackList.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const server = require('../src/server');
const app = require("../src/app");
const faker = require("faker");

const first_name = faker.name.firstName();
const last_name = faker.name.lastName();
const email = faker.internet.email();

const userLogin = {
  email,
  password: "12345",
};

const userData = {
  first_name,
  last_name,
  email,
  password: "12345",
  repeat_password: "12345",
  type_of: "User",
};

before((done) => {
  sinon.stub(user, "findOne").callsFake(() => {
    userData.toJSON() = () =>{
      return userLogin
    }
    return userData;
  });
  sinon.stub(user, "find").callsFake(() => {
    return [userData];
  });
  sinon.stub(tokenBlackListModel, "findOne").callsFake(() => {
    return false;
  });
  done();
});

after((done) => {
  app.close(done);
});

describe("Users Test", () => {
  it("Should Authenticate", async () => {

    sinon.stub(jwt, "sign").callsFake(() => {
      return 'SIGNED';
    });

    sinon.stub(bcrypt, "compareSync").callsFake(() => {
      return true;
    });

    const result = await supertest(app).
    post("/user/auth").
    send(userLogin).
    expect(200);

  });
  // it("It should response the GET method", async () => {
  //   sinon.stub(jwt, "verify").callsFake(() => {
  //     return true;
  //   });
  //   const result = await supertest(app).get("/user").expect(200);
  // });
  // it("It should response the POST method", async () => {
  //   sinon.stub(user, "create").callsFake(() => {
  //     return userData;
  //   });
  //   const result = await supertest(app).post("/user", userData).expect(404);
  //   console.log(result);
  // });
});
