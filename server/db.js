import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function connectToDatabase() {
    try {
        const mongoUrl = process.env.MONGO_URL
        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectToDatabase;
