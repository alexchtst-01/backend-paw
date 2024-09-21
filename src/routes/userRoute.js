import express from "express";
import {
  getUser,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

// need protection routes
router.get("/users", verify, getUser);
router.get("/users/:id", getUserbyId);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", verify, deleteUser);

export default router;