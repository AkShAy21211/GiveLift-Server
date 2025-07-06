import mongoose, { Schema } from "mongoose";
import { AuditLog } from "../../domain/entities/AuditLog";

const auditLogSchema = new Schema<AuditLog>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    required: true,
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  previousValue: {
    type: Schema.Types.Mixed,
  },
  newValue: {
    type: Schema.Types.Mixed,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
  },
});

auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ action: 1, timestamp: -1 });

const AuditLogModel = mongoose.model<AuditLog>("AuditLog", auditLogSchema);
export default AuditLogModel;
