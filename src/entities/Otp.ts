

interface Otp {
  _id?: string;
  otp: string;
  email:string;
  expiresAt:Date;
  createdAt?: Date;
  updatedAt?: Date;
}


export default Otp