const express = require("express");
const { createUser, getUsers } = require("../controller/user");
const userRouter = express.Router();
userRouter.get("/user", getUsers);
userRouter.post("/user", createUser);
module.exports = {
  userRouter,
};
