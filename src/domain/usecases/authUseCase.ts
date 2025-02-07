import { User } from "../entities/User.js"; 
import BCrypt from "../../infrastructure/utils/bcrypt.js";
import IUserRepository from "../interfaces/userRepository.interface.js";
import AppError from "../../infrastructure/utils/AppError.js";
import JsonWebToken from "../../infrastructure/utils/jwt.js";
import IOtpRepository from "../interfaces/otpRepository.interfae.js";
import Twilio from "../../infrastructure/services/twilioService.js";
import STATUS_CODES from '../../constants/statusCodes.js';
import STATUS_MESSAGES from "../../constants/statusMessages.js";

class AuthUseCase   {
  constructor(
    private _userRepository: IUserRepository,
    private _bcrypt: BCrypt,
    private _jsonWebToken: JsonWebToken,
    private _otpRepository: IOtpRepository,
    private _twilio: Twilio
  ) {}
  async createAndSaveUser(user: User): Promise<{ user: User; token: string }> {
    try {
      const existingUser = await this._userRepository.findUserByEmailOrPhone(
        user.email,
        user.phone
      );
      if (existingUser) {
        throw new AppError(
          STATUS_MESSAGES.USER_ALREADY_EXISTS,
          STATUS_CODES.CONFLICT
        );
      }

      const hashedPassword = await this._bcrypt.hashPassword(user.password);
      user.password = hashedPassword as string;
      const savedUser = await this._userRepository.create(user);

      if (!savedUser) {
        throw new AppError(
          STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
          STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }

      return {
        user: savedUser,
        token: this._jsonWebToken.generateToken({
          _id: user._id as string,
          email: user.email,
          role: user.role,
        }),
      };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
  async authenticateUser(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {

    try {
      const existingUser = await this._userRepository.findUserByEmailOrPhone(
        email,
        ""
      );

      if (!existingUser) {
        throw new AppError(
          STATUS_MESSAGES.USER_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }
      const isValidPassword = this._bcrypt.comparePassword(
        password,
        existingUser?.password as string
      );

      if (!isValidPassword) {
        throw new AppError(
          STATUS_MESSAGES.INVALID_CREDENTIALS,
          STATUS_CODES.UNAUTHORIZED
        );
      }

      return {
        user: existingUser,
        token: this._jsonWebToken.generateToken({
          _id: existingUser._id as string,
          email: existingUser.email,
          role: existingUser.role,
        }),
      };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async fetchUserByEmailOrPhone(
    email: string,
    phone: string
  ): Promise<User | null | undefined> {
    try {
      const user = await this._userRepository.findUserByEmailOrPhone(
        email,
        phone
      );

      if (!user) {
        throw new AppError(
          STATUS_MESSAGES.USER_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }

      return user;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async sendOtpForForgetPassword(phone: string): Promise<User> {
    try {
      const existingUser = await this._userRepository.findUserByEmailOrPhone(
        "",
        phone
      );

      if (!existingUser) {
        throw new AppError(
          STATUS_MESSAGES.USER_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }

      const data = this._twilio.generateOTP();
      const hashOtp = await this._twilio.hashOtp(data.otp);
      const otpEntity = {
        email: existingUser.email,
        otp: hashOtp,
        expiresAt: data.expiresAt,
      };
      const otp = await this._otpRepository.saveOTP(otpEntity);

      if (!otp) {
        throw new AppError(
          STATUS_MESSAGES.OTP_CREATETION_FAILED,
          STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }
      const send = await this._twilio.sendOtp(phone, data.otp);
      if (!send) {
        throw new AppError(
          STATUS_MESSAGES.OTP_SEND_FAILED,
          STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }

      return existingUser;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
  async verifyOtpForForgetPassword(email: string, otp: string): Promise<void> {
    try {
      const otpEntity = await this._otpRepository.getOtpByEmail(email);

      if (!otpEntity) {
        throw new AppError(
          STATUS_MESSAGES.OTP_NOTFOUND,
          STATUS_CODES.BAD_REQUEST
        );
      }
      const isValidOtp = await this._twilio.compareOTP(otpEntity.otp, otp);

      if (!isValidOtp) {
        throw new AppError(STATUS_MESSAGES.OTP_EXPIRED, STATUS_CODES.BAD_REQUEST);
      }

      await this._otpRepository.deleteOtp(otpEntity.otp);
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export default AuthUseCase;
