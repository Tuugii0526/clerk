// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
// import userRouter from "./route/user.js";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { webRouter } = require("./route/webhook");
const { userRouter } = require("./route/user");

mongoose.connect(process.env.MONGODB_URL);
const PORT = 5000;
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.raw({ type: "application/json" }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  return res.send("Hello world");
});
app.use("/api", userRouter);
app.use("/api", webRouter);
app.listen(PORT, () => {
  console.log(`server started working : http://localhost:${PORT}`);
});
