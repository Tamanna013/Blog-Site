import express from "express";
import authRoutes from "./Routes/authRoutes.js";
import { Connection } from "./database/db.js";

const app = express();
Connection();
app.use(express.json());

import cors from "cors";
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use("/api/auth", authRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
