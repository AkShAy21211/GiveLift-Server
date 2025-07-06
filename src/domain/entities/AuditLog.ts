import { Document, Types } from "mongoose";

export interface AuditLog extends Document {
    userId: Types.ObjectId;
    action: string;
    entityType: string;
    entityId: Types.ObjectId;
    previousValue?: Record<string, any>;
    newValue?: Record<string, any>;
    timestamp: Date;
    ipAddress?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }