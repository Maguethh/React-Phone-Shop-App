import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import phoneRoutes from "./routes/phoneRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT: number = 4000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/phone", phoneRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => {
    console.log("connected to MongoDB...");
  })
  .catch((err) => {
    console.error("could not connect to MongoDB", err);
  });
