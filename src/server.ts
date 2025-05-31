import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT}`);
  });
};

startServer();
