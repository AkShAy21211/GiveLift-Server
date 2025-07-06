import { Document } from "mongoose";

export interface GeoPoint {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  }
  
  export interface Resource extends Document {
    resourceType: string;
    currentQuantity: number;
    unit: string;
    source: string;
    location: GeoPoint;
    locationName: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  