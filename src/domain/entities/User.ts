import { Types } from "mongoose";

export interface Address {
  district?: string;
  state?: string;
  country?: string;
}

export interface AppUser  extends Document {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone: string;
  address?: Address;
  role: string;
  isVolunteer: boolean;
  reputationScore?: number;
  badges?: string[];
  resetToken?: string | null;
  resetTokenExpires?: Date|null;
  isDeleted?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
