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
  role: string;
  address?: Address;
  createdAt?: Date;
  updatedAt?: Date;
}


