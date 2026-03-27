import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
  // Fetch all products from the database
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });    
  } catch (error) {
    console.log("Error in Fetch all products:", error.message);
    res.status(500).json({ success: false, message: 'Server Error. Unable to fetch products.' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' });
  }
  
  try {
    const product = await Product.findById(id);
    return res.json(product);
  } catch (error) {
    console.log("Error in Fetch single product:", error.message);
    res.status(500).json({ success: false, message: 'Server Error. Unable to fetch product.' });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body; // Get product data from request body "user will send this data"

  if (!product.name || !product.price || !product.description || !product.image) {
    return res.status(400).json({ message: 'All fields are required. Please fill all the fields.' });
  }

  const newProduct = new Product({
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
  });

  try {
    await newProduct.save();
    res.status(201).json({  success: true, message: 'Product created successfully', data: newProduct  });
  } catch (error) {
    console.log("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: 'Server Error. Unable to create product.' });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    console.log("Error Updating product", error.message);
    res.status(500).json({ success: false, message: 'Server Error. Unable to update product.' });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(`id: ${id}`)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  }
  catch (error) {
    console.log("Error in Delete product:", error.message);
    res.status(500).json({ success: false, message: 'Server Error. Unable to delete product.' });
  }
}

