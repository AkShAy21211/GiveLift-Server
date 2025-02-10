import { Request, Response } from "express-serve-static-core";
import {
  ForgetPasswordDto,
  LoginUserDto,
  RegisterUserDto,
  VerifyForgetPasswordDto,
} from "../dtos/userDtos.js";
import {
  forgetPasswordDtoValidator,
  userCreateValidator,
  userLoginValidator,
} from "../infrastructure/utils/validation.js";
import Logger from "../infrastructure/utils/logger.js";
import AuthUseCase from "../domain/usecases/authUseCase.js";
import STATUS_CODES from "../constants/statusCodes.js";
import STATUS_MESSAGES from "../constants/statusMessages.js";
import ENVS from "../infrastructure/config/envConfig.js";
class AuthController {
  constructor(private _userUseCase: AuthUseCase) {}

  async register(
    req: Request<{}, {}, RegisterUserDto>,
    res: Response
  ): Promise<void> {
    const { body } = req;

    // Validate user input using Joi
    const { error } = userCreateValidator.validate(body);
    if (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.details[0].message,
      });
      return;
    }

    try {
      // Create and save user in the database
      const savedData = await this._userUseCase.createAndSaveUser(body);

      const currentUser = {
        _id: savedData.user._id,
        role: savedData.user.role,
        token: savedData.token,
      };
      res.cookie("currentUser", JSON.stringify(currentUser), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
        secure: ENVS.NODE_ENV === "production",
        sameSite: "lax",
      });

      res.status(STATUS_CODES.OK).json({
        message: STATUS_MESSAGES.REGISTRATION_SUCCESS,
        token: savedData.token,
        role: savedData.user.role,
      });
      return;
    } catch (error: any) {
      Logger.error(error);
      res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
      return;
    }
  }

  async login(
    req: Request<{}, {}, LoginUserDto>,
    res: Response
  ): Promise<void> {
    const { body } = req;

    // Validate user input using Joi
    const { error } = userLoginValidator.validate(body);
    if (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.details[0].message,
      });
      return;
    }

    try {
      const savedData = await this._userUseCase.authenticateUser(
        body.email,
        body.password
      );
      const currentUser = {
        _id: savedData.user._id,
        role: savedData.user.role,
        token: savedData.token,
      };
      res.cookie("currentUser", JSON.stringify(currentUser), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
        secure: ENVS.NODE_ENV === "production",
        sameSite: "lax",
      });

      res.status(STATUS_CODES.OK).json({
        message: STATUS_MESSAGES.LOGIN_SUCCESS,
        token: savedData.token,
        role: savedData.user.role,
      });
      return;
    } catch (error: any) {
      Logger.error(error);
      res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
      return;
    }
  }

  async forgetPassword(
    req: Request<{}, {}, ForgetPasswordDto>,
    res: Response
  ): Promise<void> {
    const { body } = req;

    // Validate user input using Joi
    const { error } = forgetPasswordDtoValidator.validate(body);
    if (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.details[0].message,
      });
      return;
    }
    try {
      // Send password reset otp to the user's phone number
      const user = await this._userUseCase.sendOtpForForgetPassword(body.phone);

      res.cookie("email", user.email, {
        // 5minutes expiry
        expires: new Date(Date.now() + 5 * 60 * 1000),
        httpOnly: true,
        secure: false,
      });

      res.status(STATUS_CODES.OK).json({
        message: STATUS_MESSAGES.OTP_SEND,
      });
      return;
    } catch (error: any) {
      Logger.error(error);
      res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
      return;
    }
  }

  async verifyForgetPassword(
    req: Request<{}, {}, VerifyForgetPasswordDto>,
    res: Response
  ): Promise<void> {
    try {
      const { body } = req;
      const email: string = req.cookies.email;

      await this._userUseCase.verifyOtpForForgetPassword(email, body.otp);

      res.status(STATUS_CODES.OK).json({
        message: STATUS_MESSAGES.OTP_VERIFICATION_SUCCESS,
      });
      return;
    } catch (error: any) {
      Logger.error(error);

      res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
      return;
    }
  }

  logout(req: Request, res: Response): void {
    try {
      res.clearCookie("currentUser");
      res.status(STATUS_CODES.OK).json({
        status: true,
        message: STATUS_MESSAGES.LOGOUT_SUCCESS,
      });
    } catch (error: any) {
      Logger.error(error);
      res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default AuthController;
