// import User from "../model/user.js";
const { User } = require("../model/user");
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const createUser = async (req, res) => {
  try {
    const createdUser = await User.create({
      email: "namjildorjtuguldur1234@gmail.com",
    });
    return res.status(201).json({ createdUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
// export { createUser, getUsers };
module.exports = {
  createUser,
  getUsers,
};
