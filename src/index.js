import { mongo } from "mongoose";
import connectDB from "./db/index.js";
import "dotenv/config";
import {app} from "./app.js"

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(` Server is runnning at port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
    app.listen(process.env.PORT, () => {
     console.log( `App is listening on Port : ${process.env.PORT}`);
    });
  });












/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERRR:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
     console.log( `App is listening on Port : ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERRPR", error);
  }
})();
*/
