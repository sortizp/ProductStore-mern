import mongoose from 'mongoose';

// Connect to MongoDB
export const connectDB = async () => {
  try {
    // Switch between docker MongoDB and Atlas using environment variable 
    // // MONGO_URI - LOCAL || MONGODB_URI - atlas
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
