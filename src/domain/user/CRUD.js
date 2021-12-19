const user = require("../../server/models/user.model");
const bcrypt = require("bcryptjs");

async function create(req, res, next) {
  const userData = req.body;
  if (userData.password !== userData.repeat_password) {
    return res.send({
      message: "Password Must Match",
    });
  }
  delete userData.repeat_password
  await bcrypt.hash(userData.password, 10).then(function (hash) {
    userData.password = hash;
  });
  const userNew = await user.create(userData);
  return res.send(userNew);
}

function read(req, res, next) {
  return res.send("POST USER CALLED");
}

function update(req, res, next) {
  return res.send("POST USER CALLED");
}

function del(req, res, next) {
  return res.send("POST USER CALLED");
}

module.exports = { create, read, update, del };
