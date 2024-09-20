import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";
import loginRoute from "./src/routes/loginRoute.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Backend server PAW kelompok 5");
});

server.use("/api/v1", loginRoute);
server.use("/api/v1", userRoute);
server.use("/api/v1", productRoute);

server.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server run and up in port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((error) => console.log("Connection error:", error));
