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
const createUserFromClerk = async (value) => {
  const {
    id,
    first_name,
    last_name,
    email_addresses,
    image_url,
    public_metadata,
  } = value;

  const { email_address } = email_addresses[0];
  const role = public_metadata.role || "member";
  console.log("value is:", value);
  console.log("eamil :", email_address);
  console.log("role:", role);
  try {
    const createdUser = await User.create({
      id: id,
      first_name: first_name,
      last_name: last_name,
      email_address: email_address,
      image_url: image_url,
      role: role,
    });
    return createdUser;
  } catch (error) {
    console.log(`Error occured adding user.Error:${error}`);
    return false;
  }
};
// export { createUser, getUsers };
module.exports = {
  createUser,
  getUsers,
  createUserFromClerk,
};
