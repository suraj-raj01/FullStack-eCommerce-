import express from "express";
import {
  createHero,
  updateHero,
  getHeroes,
  getHeroById,
  deleteHero,
} from "../controllers/heroController.js";

const router = express.Router();

router.post("/", createHero);
router.put("/:id", updateHero);
router.get("/", getHeroes);
router.get("/:id", getHeroById);
router.delete("/:id", deleteHero);

export default router;