import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getProductById } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts); // Get all products
router.get('/:id', getProductById); // Get a single product by ID
router.post('/', createProduct); // Create a new product
router.put('/:id', updateProduct); // Update an existing product
router.delete('/:id', deleteProduct); // Delete a product

export default router;