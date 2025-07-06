import mongoose, { Schema, Document } from "mongoose";
import { GeoPoint, Resource } from "../../domain/entities/Resource";



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

const resourceSchema = new Schema<Resource>(
  {
    resourceType: {
      type: String,
      required: true,
    },
    currentQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    location: {
      type: geoPointSchema,
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


resourceSchema.index({ resourceType: 1 });
resourceSchema.index({ location: "2dsphere" });

const ResourceModel = mongoose.model<Resource>("Resource", resourceSchema);
export default ResourceModel;
