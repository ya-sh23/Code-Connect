import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import http from "http";
import { initSocketServer } from "./socket/index.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Auth server running");
});

console.log("About to init socket server...");
initSocketServer(server);
console.log("initSocketServer finished — now listening soon");

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
