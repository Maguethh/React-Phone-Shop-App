import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import phoneRoutes from "./routes/phoneRoutes";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import Phone from "./models/phoneModel";

dotenv.config();

const app: Express = express();
const PORT: number = 4000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // modifier le port si besoin (celui du frontend)
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

app.use("/phone", phoneRoutes);
app.use("/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("un client s'est connecté");

  const changeStream = Phone.watch();

  changeStream.on("change", (change) => {
    Phone.find().then((phones) => {
      io.emit("updatePhones", phones);
    });
  });

  socket.on("requestPhones", async () => {
    try {
      const phones = await Phone.find();
      socket.emit("updatePhones", phones);
    } catch (error) {
      console.error("erreur lors de la récup :", error);
      socket.emit("error", "erreur lors de la récup des téléphones");
    }
  });

  socket.on("disconnect", () => {
    console.log("un client s'est déco");
    changeStream.close();
  });
});

httpServer.listen(PORT, () => {
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
