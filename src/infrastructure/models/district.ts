import mongoose, { Schema } from "mongoose";
import { District, GeoJSON } from "../../domain/entities/District";



const geoJSONSchema = new Schema<GeoJSON>(
  {
    type: {
      type: String,
      enum: ["Polygon", "MultiPolygon"],
      required: true,
    },
    coordinates: {
      type: [[[Number]]], // For Polygon or MultiPolygon
      required: true,
    },
  },
  { _id: false }
);

const districtSchema = new Schema<District>(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    geojsonBoundary: geoJSONSchema,

  },
  {
    timestamps: true,
  }
);

districtSchema.index({ name: 1, state: 1 }, { unique: true });

const DistrictModel = mongoose.model<District>("District", districtSchema);
export default DistrictModel;
