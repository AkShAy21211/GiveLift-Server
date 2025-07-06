import { Types } from "mongoose";
import { Document } from "postcss";

export interface GeoPoint {
  type: "Point";
  coordinates: [number, number]; 
}

export interface Disaster extends Document {
  disasterType: string;
  address: string;
  location?: GeoPoint
  districtId: Types.ObjectId;
  severity: string;
  description?: string;
  reportedBy: Types.ObjectId;
  resourcesNeeded: string[];
  volunteersAssigned: Types.ObjectId[];
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}