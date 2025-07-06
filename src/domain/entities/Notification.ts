import { Document, Types } from "mongoose";

export interface Notification extends Document {
  recipient: Types.ObjectId;
  type: "disaster_alert" | "resource_assignment" | "fact_check_update" | string;
  message: string;
  relatedEntity?: Record<string, any>; // can store related entity info like { type: 'disaster', id: ObjectId }
  read: boolean;
  sender?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}