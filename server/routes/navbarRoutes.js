import express from "express";
import {
  createNavbar,
  updateNavbar,
  getNavbar,
  getNavbarById,
  deleteNavbar,
} from "../controllers/navbarController.js";

const router = express.Router();

router.post("/", createNavbar);
router.put("/:id", updateNavbar);
router.get("/", getNavbar);
router.get("/:id", getNavbarById);
router.delete("/:id", deleteNavbar);

export default router;