import { Types } from "mongoose";

export interface ResourceDetails {
  resourceType: string;
  quantity: number;
  unit: string;
}

export interface Donation extends Document {
  donatedBy: Types.ObjectId;
  donationType: "monetary" | "resource";
  resourceDetails?: ResourceDetails;
  monetaryAmount?: number;
  transactionId?: string;
  status: "pending" | "approved" | "rejected" | "fulfilled";
  assignedToDisaster?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
