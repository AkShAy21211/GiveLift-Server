import mongoose, { Schema, Types } from "mongoose";
import { DisasterReport } from "../../domain/entities/Disaster";




const DisasterReportSchema = new Schema<DisasterReport>(
  {
    place: { type: String, required: true },
    country: { type: Object },
    state: { type: Object },
    district: { type: String },
    disasterType: {
      type: String,
    },
    status:{
      type: String,
      default: "pending"
    },
    severityLevel: {
      type: String,
    },
    reportedBy:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    peopleAffected: { type: Number, default: 0 },
    situationDescription: { type: String, default: "" },
    resourcesNeeded: { type: [String], default: [] },
  },
  {
    timestamps: true, 
  }
);

export const DisasterReportModel = mongoose.model<DisasterReport>(
  "DisasterReport",
  DisasterReportSchema
);
