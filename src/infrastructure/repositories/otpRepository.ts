import Otp from "../../entities/Otp.js";
import IOtpRepository from "../../interfaces/repositories/otpRepository.interfae.js";
import OtpModel from "../database/otp.js";
import AppError from "../utils/AppError.js";
import Logger from "../utils/logger.js";

class OtpRepository implements IOtpRepository {
  async saveOTP(otpData: object): Promise<Otp|null> {
    try {
      const otp = new OtpModel(otpData);
      return await otp.save();
    } catch (error) {
      Logger.error(` Failed to save otp data: ${error}`);
      return null; 

    }
  }
  async getOTPByMail(email: string): Promise<Otp | null> {
    try {
      return await OtpModel.findOne({ email });
    } catch (error) {
      Logger.error(`Failed to find otp by email: ${error}`);
      return null; 
    }
  }
}


export default OtpRepository