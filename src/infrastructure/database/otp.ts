import { model, Schema } from "mongoose";
import Otp from "../../entities/Otp.js";

export interface OtpDocument extends Otp, Document {}

export const otpSchema = new Schema<OtpDocument>({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpModel = model<OtpDocument>("Otp", otpSchema);

export default OtpModel;
