import Otp from "../../domain/entities/Otp.js";
import IOtpRepository from "../../domain/interfaces/otpRepository.interfae.js";
import OtpModel from "../database/otp.js";
import AppError from "../utils/AppError.js";
import Logger from "../utils/logger.js";

class OtpRepository implements IOtpRepository {
  async saveOTP(otpData: object): Promise<Otp | null> {
    try {
      const otp = new OtpModel(otpData);
      return await otp.save();
    } catch (error) {
      Logger.error(` Failed to save otp data: ${error}`);
      return null;
    }
  }
  async getOtpByEmail(email: string): Promise<Otp | null> {
    try {
      return await OtpModel.findOne({ email });
    } catch (error) {
      Logger.error(`Failed to find otp by email: ${error}`);
      return null;
    }
  }
  async deleteOtp(otp: string): Promise<boolean> {
    try {
      const result = await OtpModel.deleteOne({ otp });
      return result.deletedCount > 0;
    } catch (error) {
      Logger.error(`Failed to delete OTP: ${error}`);
      return false;
    }
  }
}

export default OtpRepository;
