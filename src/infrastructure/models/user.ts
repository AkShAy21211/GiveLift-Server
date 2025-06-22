import mongoose, { Schema, Document } from "mongoose";
import { User } from '../../domain/entities/User';

interface UserDocument extends Omit<User, "_id">, Document {
  // `_id` is already present in Document, so omit it from User
  _id: string; // or Types.ObjectId if you prefer
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["state_coordinator", "district_coordinator", "general_user"],
    },
    isVolunteer: {
      type: Boolean,
      default: false,
    },
    // New optional fields
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    resetToken:{
      type:String
    },
    resetTokenExpires:{
      type:Date,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pincode: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // optional: helps validation
    },
    dob: {
      type: String, // or Date if you're storing as a date object
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
