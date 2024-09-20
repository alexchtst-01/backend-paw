import express from "express";
import {
  getUser,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUser);
router.get("/users/:id", getUserbyId);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;