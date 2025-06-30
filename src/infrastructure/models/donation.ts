import mongoose, { Schema } from "mongoose";
import Donation from "../../domain/entities/Donation";

// Mongoose Schema definition
const DonationSchema: Schema = new Schema({
  resourceType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  address: {
    type: String,
    required: true,
    minlength: 10,
  },
  note: {
    type: String,
    required: false,
  },
  donatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "verified", "completed", " rejected", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},{
  timestamps: true
});



// Create and export the model
const DonationModel = mongoose.model<Donation>("Donation", DonationSchema);
export default DonationModel;
