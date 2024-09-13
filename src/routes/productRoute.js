import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProduct);
router.post("/products", createProduct);
router.patch("/products", updateProduct);
router.delete("/products", deleteProduct);

export default router;
