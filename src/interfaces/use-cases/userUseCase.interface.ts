import Otp from "../../entities/Otp.js";
import { User } from "../../entities/User.js";
import JsonResponse from "../../types/response.js";

interface IUserUseCase {
  createAndSaveUser(user: User): Promise<{user:User,token:string}>;
  authenticateUser(email:string,password:string):Promise<{user:User,token:string}>;
  fetchUserByEmailOrPhone(email: string,phone:string): Promise<User|null|undefined>;
  sendOtpForForgetPassword(email:string):Promise<User>;
  verifyOtpForForgetPassword(email:string,otp:string):Promise<void>;
}

export default IUserUseCase;
