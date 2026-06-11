import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';

const envFile = process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

// Load environment variables from .env file
dotenv.config({ path: envFile });

// Create an Express application
const app = express();
const BACKEND_PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

// Start the server
app.listen(BACKEND_PORT, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${BACKEND_PORT}`);
});