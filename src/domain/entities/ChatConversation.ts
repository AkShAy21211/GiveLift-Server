import { Document, Types } from "mongoose";

export interface ChatConversation extends Document {
    participants: Types.ObjectId[];
    type: "user_coordinator" | "group" | string;
    lastMessageAt?: Date;
    title?: string;
    status: "active" | "closed" | string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  