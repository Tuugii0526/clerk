// import mongoose from "mongoose";
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  clerk_id: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  emails: {
    type: [String],
    required: true,
  },
  image_url: {
    type: String,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "member"],
      message: "{VALUE} is not a valid role",
    },
    default: "member",
  },
});
const User = mongoose.model("User", userSchema);
// export default User;
module.exports = {
  User,
};
