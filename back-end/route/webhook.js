// import express from "express";
// import { tryWebhook } from "../controller/webhook.js";
const express = require("express");
const { tryWebhook } = require("../controller/webhook");
const webRouter = express.Router();
webRouter.post("/webhook", tryWebhook);
module.exports = {
  webRouter,
};
