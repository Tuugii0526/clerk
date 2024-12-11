//temporary
// import "dotenv/config";
// import { Webhook } from "svix";
require("dotenv").config();
const { User } = require("../model/user");
const {
  createUserFromClerk,
  updateUserFromClerk,
  deleteUserFromClerk,
} = require("../controller/user");
const svix = require("svix");
const { Webhook } = svix;
const tryWebhook = async (req, res) => {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  console.log("signing secret:", SIGNING_SECRET);
  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers and body
  const headers = req.headers;
  const payload = req.body;

  // Get Svix headers for verification
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return void res.status(400).json({
      success: false,
      message: "Error: Missing svix headers",
    });
  }

  let evt;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If verification fails, error out and return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.log("Error: Could not verify webhook:", err.message);
    return void res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const {
    id,
    first_name,
    last_name,
    email_addresses,
    image_url,
    public_metadata,
    deleted,
  } = evt.data;
  const eventType = evt.type;
  const value = {
    id,
    first_name,
    last_name,
    email_addresses,
    image_url,
    public_metadata,
    deleted,
  };
  switch (eventType) {
    case "user.created": {
      const createdUser = await createUserFromClerk(value);
      if (createdUser) {
        return res.status(201).json({
          success: true,
          message: "User created",
          createdUser: createdUser,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to create user",
        });
      }
    }
    case "user.updated": {
      const updatedUser = await updateUserFromClerk(value);
      if (updatedUser) {
        return res.status(201).json({
          success: true,
          message: "User updated",
          createdUser: updatedUser,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to update user",
        });
      }
    }
    case "user.deleted": {
      const deletedUser = await deleteUserFromClerk(value);
      if (deletedUser) {
        return res.status(201).json({
          success: true,
          message: "User deleted",
          createdUser: deletedUser,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to delete user",
        });
      }
    }
  }
};
// export { tryWebhook };
module.exports = {
  tryWebhook,
};
