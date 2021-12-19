const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenBlackListModel = mongoose.model(
  "tokenBlackList",
  new Schema(
    {
      token: {
        type: String,
        required: true,
      }
    },
    { timestamps: true }
  )
);

module.exports = tokenBlackListModel;
