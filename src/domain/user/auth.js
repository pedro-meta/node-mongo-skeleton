const user = require("../../server/models/user.model");
const refreshTokenModel = require("../../server/models/refreshToken.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = `59127bfe1f2b05e27c4f68ca54f621ccc387cbc4120f23ba85f4a54872339773`;

async function auth(req, res, next) {
  const userData = req.body;
  const userDB = await user.findOne({
    email: userData.email,
  });

  if (!userDB)
    return res.send({
      message: `User is not Find`,
    });

  const valid = await bcrypt.compareSync(userData.password, userDB.password);
  if (!valid)
    return res.send({
      message: `Wrong Password`,
    });

  delete userDB.password;

  const accessToken = jwt.sign(userDB.toJSON(), SECRET, {
    expiresIn: 3000,
  });
  const expiresIn = new Date().getTime();
  +3000;

  const refreshToken = refreshTokenModel.findOneAndUpdate(
    { userID: userDB.id, token: accessToken },
    { userID: userDB.id, token: accessToken },
    { upsert: true, new: true },
    (err, doc) => {
      return res.send({
        accessToken,
        refreshToken: doc.id,
        expiresIn,
      });
    }
  );
}
module.exports = { auth };
