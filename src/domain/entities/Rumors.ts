import { Document, Types } from "mongoose";

export interface GeoPoint {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Rumor extends Document {
  reportedBy: Types.ObjectId;
  content: string;
  sourceSeen?: string;
  screenshotUrl?: string;
  location?: GeoPoint;
  districtId?: Types.ObjectId;
  status: "pending" | "reviewed" | "dismissed" | "escalated";
  reviewedBy?: Types.ObjectId;
  associatedFactCheck?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
