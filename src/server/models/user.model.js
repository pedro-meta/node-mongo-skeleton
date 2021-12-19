const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
      dropDups: true 
    },
    password: {
      type: String,
      required: true
    },
    dateOfBirth: Date,
    emailVerified: Boolean,
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
