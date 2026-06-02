import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`);
});