import { Document, Types } from "mongoose";

export interface TargetAudience {
    region?: string;
    ageGroup?: string;
    groups?: string[];
  }
  
  export interface FactCheck extends Document {
    title: string;
    content: string;
    publishedBy: Types.ObjectId;
    type: "confirmation" | "debunking" | "clarification";
    relatedRumors: Types.ObjectId[];
    targetAudience?: TargetAudience;
    officialSourceLink?: string;
    status: "draft" | "published" | "archived";
    createdAt?: Date;
    updatedAt?: Date;
  }
  