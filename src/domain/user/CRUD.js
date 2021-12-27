/* eslint-disable require-jsdoc */
const user = require('../../server/models/user.model');
const bcrypt = require('bcryptjs');

async function create(req, res, _next) {
  const userData = req.body;
  if (userData.password !== userData.repeat_password) {
    return res.status(400).send({
      message: 'Password Must Match',
    });
  }
  delete userData.repeat_password;
  await bcrypt.hash(userData.password, 10).then(function(hash) {
    userData.password = hash;
  });
  const userNew = await user.create(userData);
  const userJSON = await userNew.toJSON();
  delete userJSON.password;

  return res.status(201).json(userJSON);
}

async function read(_req, res, _next) {
  try {
    const users = await user.find({}).select('-password -__v');
    // const usersJSON = await users.toArray();
    users.map(async (user)=>{
      delete user.password;
      return user;
    });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function update(req, res, _next) {
  const userID = req.params.user_id;
  await user.findOneAndUpdate(
      {_id: userID},
      req.body,
      {upsert: true, new: true},
      (_err, doc) => {
        return res.sendStatus(200).send(doc);
      },
  );
}
// Implementing Logic Delete
async function del(req, res, _next) {
  const userID = req.params.user_id;
  await user.findOneAndDelete(
      {_id: userID},
      (_err) => {
        return res.status(204);
      },
  );
}

module.exports = {create, read, update, del};
