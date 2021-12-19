const user = require("../../server/models/user.model");
const refreshTokenModel = require("../../server/models/refreshToken.model");
const tokenBlackListModel = require("../../server/models/tokenBlackList.model");
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
  const userJSON = userDB.toJSON();
  delete userJSON.password;

  const accessToken = jwt.sign(userJSON, SECRET, {
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
async function isTokenBlackList(token) {
  const tokenBlackList = await tokenBlackListModel.findOne({
    token,
  });
  if (tokenBlackList) return true;
  return false;
}
async function addTokenBlackList(token) {
  const tokenBlackList = await tokenBlackListModel.create({
    token,
  });
}
async function refresh(req, res, next) {
  const { authorization } = req.headers;

  
  if(isTokenBlackList(authorization)) return res.send({
    message: "This Token is Blocked"
  })
  
  const userInfo = jwt.verify(authorization, SECRET);
  
  delete userInfo.exp;
  delete userInfo.iat;
  
  const accessToken = jwt.sign(userInfo, SECRET, {
    expiresIn: 3000,
  });

  addTokenBlackList(authorization)

  const expiresIn = new Date().getTime();
  +3000;

  const refreshToken = refreshTokenModel.findOneAndUpdate(
    { userID: userInfo.id, token: authorization },
    { userID: userInfo.id, token: accessToken },
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
module.exports = { auth, refresh };
