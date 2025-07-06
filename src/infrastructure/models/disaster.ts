import mongoose, { Schema, Document, Types } from "mongoose";
import { Disaster, GeoPoint } from "../../domain/entities/Disaster";

const geoPointSchema = new Schema<GeoPoint>(
  {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default:"Point"
    },
    coordinates: {
      type: [Number, Number],
      required: true,
    },
  },
  { _id: false }
);

const disasterSchema = new Schema<Disaster>(
  {
    disasterType: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: geoPointSchema,
      required: true,
    },

    districtId: {
      type: Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    severity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resourcesNeeded: {
      type: [String],
      default: [],
    },
    volunteersAssigned: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    status: {
      type: String,
      enum: ["reported", "in_progress", "resolved", "closed"],
      default: "reported",
    },
  },
  {
    timestamps: true,
  }
);

disasterSchema.index({ location: "2dsphere" });
disasterSchema.index({ districtId: 1, status: 1 });
disasterSchema.index({ status: 1, severity: -1 });

const DisasterModel = mongoose.model<Disaster>("Disaster", disasterSchema);
export default DisasterModel;
