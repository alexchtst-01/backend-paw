import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(express.json());

mongoose
  .connect(process.env.CON_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server run and up in port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((error) => console.log("Connection error:", error));
