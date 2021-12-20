const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
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
    type_of: {
      type: String,
      required: true,
      select: false
    },
    dateOfBirth: Date,
    emailVerified: Boolean,
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
