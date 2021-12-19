const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenModel = mongoose.model(
  "refreshToken",
  new Schema(
    {
      userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      token: {
        type: String,
        required: true,
      },
      validUntil: {
        type: Date,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = refreshTokenModel;
