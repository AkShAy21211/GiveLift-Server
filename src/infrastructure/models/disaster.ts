import { Schema, model, Document } from "mongoose";
import DisasterReport from "../../domain/entities/Disaster.js";

interface DisasterReportDocument extends Document, DisasterReport {}

const disasterReportSchema = new Schema<DisasterReportDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      } as any,
      coordinates: {
        type: [Number],
        required: true,
      },
      district: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
    reportedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    severity: { type: String, required: true },
    status: { type: Boolean, default: true },
    media: { type: [String], required: true },
  },
  { timestamps: true }
);

// Ensure location has a 2dsphere index
disasterReportSchema.index({ location: "2dsphere" });

// Create and export the model
const DisasterReportModel = model<DisasterReportDocument>(
  "DisasterReport",
  disasterReportSchema
);

export default DisasterReportModel;
