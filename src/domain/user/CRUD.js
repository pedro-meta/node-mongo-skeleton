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
  const userNew = await user.create(userData)
  const userJSON = await  userNew.toJSON();
  delete userJSON.password

  return res.status(201).send(userJSON);
}

async function read(req, res, next) {
  const users = await user.find({}).select("-password -__v");
  // const usersJSON = await users.toArray();
  users.map(async(user)=>{
    delete user.password;
    return user
  })
  return res.status(200).send(users);
}

async function update(req, res, next) {
  const userID = req.params.user_id
  await user.findOneAndUpdate(
    { _id: userID },
    req.body,
    { upsert: true, new: true },
    (err, doc) => {
      return res.sendStatus(200).send(doc);
    }
  );
}
//Implementing Logic Delete
async function del(req, res, next) {
  const userID = req.params.user_id
  await user.findOneAndDelete(
    { _id: userID },
    (err) => {
      return res.sendStatus(204);
    }
  );
}

module.exports = { create, read, update, del };
