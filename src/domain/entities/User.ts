export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isVolunteer?: boolean;
  role: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  gender?: string;
  resetToken?: string|null;
  resetTokenExpires?: Date|null;
  dob?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
