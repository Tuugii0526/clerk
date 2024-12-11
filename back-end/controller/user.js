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
  const emails = email_addresses.map((email) => email.email_address);
  const role = public_metadata.role || "member";
  try {
    const createdUser = await User.create({
      clerk_id: id,
      first_name: first_name,
      last_name: last_name,
      email_address: emails,
      image_url: image_url,
      role: role,
    });
    return createdUser;
  } catch (error) {
    console.log(`Error occured adding user.Error:${error}`);
    return false;
  }
};
const updateUserFromClerk = async (value) => {
  const {
    id,
    first_name,
    last_name,
    email_addresses,
    image_url,
    public_metadata,
  } = value;
  const emails = email_addresses.map((email) => email.email_address);
  const role = public_metadata.role || "member";
  try {
    const updatedUser = await User.findOneAndUpdate(
      { clerk_id: id },
      {
        $set: {
          first_name: first_name,
          last_name: last_name,
          email_address: emails,
          image_url: image_url,
          role: role,
        },
      },
      {
        new: true,
      }
    );
    return updatedUser;
  } catch (error) {
    console.log(`Error occured adding user.Error:${error}`);
    return false;
  }
};
const deleteUserFromClerk = async (value) => {
  const { id, deleted } = value;
  if (id && deleted) {
    try {
      const deletedUser = await User.findOneAndDelete({
        clerk_id: id,
      });
      return deletedUser;
    } catch (error) {
      console.log(`Error occured adding user.Error:${error}`);
      return false;
    }
  } else {
    return false;
  }
};
// export { createUser, getUsers };
module.exports = {
  createUser,
  getUsers,
  createUserFromClerk,
  updateUserFromClerk,
  deleteUserFromClerk,
};
