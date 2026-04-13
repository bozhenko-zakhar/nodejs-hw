import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import 'dotenv/config';
import { errors } from "celebrate";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Setting's middlewares
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routers methods
app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);

// 404 & Error Middlewares
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// Server connections
await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
