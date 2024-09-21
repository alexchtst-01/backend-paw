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
server.use(cors({
  origin: "*"
}));
server.use(express.json());

mongoose.connect(process.env.MONGO_STRING);
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("conection success to mongodb atlas")
  server.listen(process.env.SERVER_PORT, () => {
    console.log(`server up and running in localhost:${process.env.SERVER_PORT}`)
  })
})

server.get("/", (req, res) => {
  res.send("Backend server PAW kelompok 5");
});

server.use("/api/v1", loginRoute);
server.use("/api/v1", userRoute);
server.use("/api/v1", productRoute);

server.use(morgan("dev"));
