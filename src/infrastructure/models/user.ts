import mongoose, { Schema } from "mongoose";
import { User } from "../../domain/entities/User.js";

interface UserDocument extends User, Document {}

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
    avatar: {
      type: String,
      required: false,
    },
    phone: {
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
      enum: ["admin", "user", "coordinator"],
    },
    isVolunteer: {
      type: Boolean,
      default: false,
    },
    address: {
      district: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      pincode: {
        type: Number,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
