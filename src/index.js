import connectDB from "./db/index.js";
import "dotenv/config";

connectDB()

/*
import express from "express";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error:", (error) => {
      console.log("ERRR:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      `App is listening on Port : ${process.env.PORT}`;
    });
  } catch (error) {
    console.error("ERRPR", error);
  }
})();
*/
