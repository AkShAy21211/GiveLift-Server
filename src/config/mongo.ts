import mongoose from "mongoose";

async function connectToDataBase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/DRMS");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
}


export default connectToDataBase