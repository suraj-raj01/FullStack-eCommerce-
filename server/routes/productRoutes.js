import express from "express";
import {
  saveProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", saveProduct);
router.put("/:id", updateProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;
