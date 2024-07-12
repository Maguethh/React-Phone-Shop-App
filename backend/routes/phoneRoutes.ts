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
router.post("/create", createPhone);
router.put("/update/:id", updatePhone);
router.delete("/delete/:id", deletePhone);

export default router;
