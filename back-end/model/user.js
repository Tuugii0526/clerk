// import mongoose from "mongoose";
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  password: {
    type: String,
  },
  email: {
    type: String,
  },
});
const User = mongoose.model("Clerkuser", userSchema);
// export default User;
module.exports = {
  User,
};
