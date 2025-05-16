import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const Connection = async () => {
  const URL = process.env.DATABASE_URL;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database:", error.message);
  }
};
