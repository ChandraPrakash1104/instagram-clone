'use server';
import mongoose from 'mongoose';

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '');

    console.log('Connected to mongodb');

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
