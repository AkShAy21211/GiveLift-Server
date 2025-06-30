import { Types } from "mongoose";

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isVolunteer?: boolean;
  role: string;
  phone?: string;
  address?: string;
  district?: string;
  state?: object | string;
  country?: object | string;
  isActive?: boolean;
  gender?: string;
  isDeleted?: boolean;
  resetToken?: string|null;
  resetTokenExpires?: Date|null;
  dob?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
