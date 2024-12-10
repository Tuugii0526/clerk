//temporary
// import "dotenv/config";
// import { Webhook } from "svix";
require("dotenv").config();
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
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", evt.data);
  switch (eventType) {
    case "user.created": {
    }
  }
  return res.status(201).json({
    success: true,
    message: "Webhook received",
  });
};
// export { tryWebhook };
module.exports = {
  tryWebhook,
};

// Webhook payload: {
//   birthday: '',
//   created_at: 1654012591514,
//   email_addresses: [
//     {
//       email_address: 'example@example.org',
//       id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
//       linked_to: [],
//       object: 'email_address',
//       verification: [Object]
//     }
//   ],
//   external_accounts: [],
//   external_id: '567772',
//   first_name: 'Example',
//   gender: '',
//   id: 'user_29w83sxmDNGwOuEthce5gg56FcC',
//   image_url: 'https://img.clerk.com/xxxxxx',
//   last_name: 'Example',
//   last_sign_in_at: 1654012591514,
//   object: 'user',
//   password_enabled: true,
//   phone_numbers: [],
//   primary_email_address_id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
//   primary_phone_number_id: null,
//   primary_web3_wallet_id: null,
//   private_metadata: {},
//   profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
//   public_metadata: {},
//   two_factor_enabled: false,
//   unsafe_metadata: {},
//   updated_at: 1654012591835,
//   username: null,
//   web3_wallets: []
// }
