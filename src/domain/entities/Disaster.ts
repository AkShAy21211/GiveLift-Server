import { Types } from "mongoose";
import { Document } from "postcss";

export interface GeoPoint {
  type: "Point";
  coordinates: [number, number]; 
  label: string;
}

export interface Disaster extends Document {
  disasterType: string;
  address: GeoPoint|string;
  districtId: Types.ObjectId|string;
  severity: string;
  description: string;
  reportedBy: Types.ObjectId|string;
  resourcesNeeded: string[];
  volunteersAssigned?: Types.ObjectId|string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}