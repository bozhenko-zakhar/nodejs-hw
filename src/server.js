import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Setting's middlewares
app.use(logger);
app.use(express.json());
app.use(cors());

// Routers methods
app.use(notesRoutes);

// 404 & Error Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Server connections
await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
