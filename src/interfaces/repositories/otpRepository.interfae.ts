import Otp from "../../entities/Otp.js";


interface IOtpRepository{
    saveOTP(otpData: object): Promise<Otp|null>;
    getOtpByEmail(email:string):Promise<Otp|null>
    deleteOtp(otp: string):Promise<boolean>;
}
export default IOtpRepository