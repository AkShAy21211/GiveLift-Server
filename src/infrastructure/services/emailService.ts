import twilio from "twilio";
import ENVS from "../config/envConfig.js";
import Logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";

export class TwilioService {
  private client: twilio.Twilio;
  private senderPhone: string;

  constructor() {
    this.client = twilio(ENVS.TWILIO_SID, ENVS.TWILIO_TOKEN);
    this.senderPhone = ENVS.TWILIO_PHONE!;
  }

  async sendOtp(phone: string, otp: string, message: string): Promise<boolean> {
    try {
      await this.client.messages.create({
        body: `${message} ${otp}`,
        from: this.senderPhone,
        to: phone,
      });
      return true;
    } catch (error) {
      Logger.error("Twilio Error:", error);
      throw new AppError("Twilio Error:", 500);
    }
  }
}
