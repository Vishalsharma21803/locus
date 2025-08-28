import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/Product.js";
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authenticate, authorizeAdmin, createProduct);
router.put("/:id", authenticate, authorizeAdmin, updateProduct);
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

export default router;
