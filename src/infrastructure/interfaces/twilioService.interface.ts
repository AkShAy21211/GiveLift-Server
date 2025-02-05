export interface ITwilio {
  sendOtp(phone: string, otp: string): Promise<boolean>;
  generateOTP(): { otp: string; expiresAt: Date };
  hashOtp(otp: string): Promise<string | undefined>;
  compareOTP(savedOTP: string, enteredOTP: string): Promise<boolean | undefined>;
}

export default ITwilio