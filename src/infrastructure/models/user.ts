import mongoose, { Schema } from "mongoose";
import { Address, AppUser } from "../../domain/entities/User";

const addressSchema = new Schema<Address>(
  {
    district: { type: String },
    state: { type: String },
    country: { type: String },
  },
  { _id: false }
);

const userSchema = new Schema<AppUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },

    phone: {
      type: String,
    },
    address: addressSchema,
    role: {
      type: String,
      required: true,
      enum: ["state_coordinator", "district_coordinator", "general_user"],
    },
    isVolunteer: {
      type: Boolean,
      default: false,
    },
    reputationScore: {
      type: Number,
      default: 0,
    },
    resetToken:{
      type: String,
      default: null
    },
    resetTokenExpires:{
      type: Date,
      default: null
    },
    badges: {
      type: [String],
      default: [],
    },
    isActive:{
      type: Boolean,
      default: true
    },
    isDeleted:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ "address.district": 1, role: 1 });

const UserModel = mongoose.model<AppUser>("User", userSchema);
export default UserModel;
