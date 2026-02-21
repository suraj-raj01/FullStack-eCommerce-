import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addSubcategory,
  addBrand,
  removeBrand,
  removeSubcategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

router.post("/:id/subcategory", addSubcategory);
router.post("/:id/brand", addBrand);
router.delete("/:id/brand", removeBrand);
router.delete("/:id/subcategory", removeSubcategory);

export default router;
