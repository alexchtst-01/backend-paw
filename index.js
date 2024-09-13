import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(morgan("combined"));

server.use("/api/v1", userRoute);
server.use("/api/v1", productRoute);

server.get("/", (req, res) => {
  res.send("Backend server PAW kelompok 5");
});

mongoose
  .connect(process.env.CON_STRING)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server run and up in port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((error) => console.log("Connection error:", error));
