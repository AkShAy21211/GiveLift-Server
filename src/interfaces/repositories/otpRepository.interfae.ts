import Otp from "../../entities/Otp.js";

interface IOtpRepository{
    saveOTP(otpData: object): Promise<Otp|null>;
    getOTPByMail(email:string):Promise<Otp|null>
}
export default IOtpRepository