import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/Product.js";
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'canteen-products',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage });

const router = express.Router();

// Allow all users to view products
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Restrict product write operations to admin only
router.post("/", authenticate, authorizeAdmin, upload.single('image'), createProduct);
router.put("/:id", authenticate, authorizeAdmin, updateProduct);
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

export default router;
