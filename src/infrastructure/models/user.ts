import mongoose, { Schema, Document } from "mongoose";
import { User } from '../../domain/entities/User';


const userSchema = new Schema<User>(
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
      required: false,
    },
    isActive:{
      type: Boolean,
      default: true,
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
    district: {
      type: String,
    },
    state: {
      type: Object,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    country: {
      type: Object,
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

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
