import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from "./db/connectMongoDB";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import notesRoutes from "./routes/notesRoutes";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

// Routers methods
app.use(notesRoutes);

// 404 & Error Middlewares
app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

// Server launching
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
