// import mongoose from "mongoose";
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: {
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
  email_address: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
const User = mongoose.model("Clerkuser", userSchema);
// export default User;
module.exports = {
  User,
};
