import bcrypt from "bcryptjs";
import twilio from "twilio";
import ENVS from "../../infrastructure/config/envConfig.js";
import { USER_MESSAGES } from "../../constants/statusCodes.js";
import Logger from "../../infrastructure/utils/logger.js";

class Twilio {
  private client: twilio.Twilio;
  private senderPhone: string;

  constructor() {
    this.client = twilio(ENVS.TWILIO_SID, ENVS.TWILIO_TOKEN);
    this.senderPhone = ENVS.TWILIO_PHONE!;
  }

  async sendOtp(phone: string, otp: string): Promise<boolean> {
    try {
      const data = await this.client.messages.create({
        body: `Your OTP is ${otp}`,
        from: this.senderPhone,
        to: `+91${phone}`,
      });

      return true;
    } catch (error) {
      Logger.error("Twilio Error:", error);
      return false;
    }
  }
  generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    return {
      otp,
      expiresAt,
    };
  }

  async hashOtp(otp: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedOTP = await bcrypt.hash(otp, salt);
      return hashedOTP;
    } catch (error) {
      Logger.error("Bcrypt Error:", error);
    }
  }

  async compareOTP(savedOTP: string, enteredOTP: string) {
    try {
      const isValid =  await bcrypt.compare(enteredOTP, savedOTP);
      return isValid;
    } catch (error) {
      Logger.error("Bcrypt Error:", error);
    }
  }
}

export default Twilio;
