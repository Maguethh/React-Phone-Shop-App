import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getPhones,
  createPhone,
  updatePhone,
  deletePhone,
} from "../controllers/phoneController";

const router = express.Router();

router.get("/list", getPhones);
router.post("/create", authMiddleware, createPhone);
router.put("/update/:id", authMiddleware, updatePhone);
router.delete("/delete/:id", authMiddleware, deletePhone);

export default router;
