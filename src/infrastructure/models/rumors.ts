import mongoose, { Schema, Document, Types } from "mongoose";
import { GeoPoint, Rumor } from "../../domain/entities/Rumors";



const geoPointSchema = new Schema<GeoPoint>({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
}, { _id: false });

const rumorSchema = new Schema<Rumor>(
  {
    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sourceSeen: {
      type: String,
    },
    screenshotUrl: {
      type: String,
    },
    location: {
      type: geoPointSchema,
    },
    districtId: {
      type: Schema.Types.ObjectId,
      ref: "District",
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "dismissed", "escalated"],
      default: "pending",
      required: true,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    associatedFactCheck: {
      type: Schema.Types.ObjectId,
      ref: "FactCheck",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

rumorSchema.index({ status: 1, createdAt: -1 });
rumorSchema.index({ districtId: 1, status: 1 });
rumorSchema.index({ reportedBy: 1 });
rumorSchema.index({ associatedFactCheck: 1 });

const RumorModel = mongoose.model<Rumor>("Rumor", rumorSchema);
export default RumorModel;
