import { Document, Types } from "mongoose";

export interface ChatMessage extends Document {
    conversationId: Types.ObjectId;
    sender: Types.ObjectId;
    message: string;
    timestamp: Date;
    readBy: Types.ObjectId[];
    messageType: "text" | "image" | "file" | string;
    attachments?: string[];
    isReported: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }