import mongoose from "mongoose";

export interface CreateDonationDto {
    resourceType: string;
    quantity: number;
    address: string;
    note?: string;
    donatedBy?: mongoose.Types.ObjectId;
    country?: string;
    state?: string;
    district?: string;
    status?: 'pending' | 'assigned' | 'completed';
    createdAt?: Date;
    updatedAt?: Date;
  }