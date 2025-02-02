export interface Address {
  latitude: number;
  longitude: number;
  district: string;
  city: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  isVolunteer:boolean;
  address?: Address;
  createdAt?: Date;
  updatedAt?: Date;
}


