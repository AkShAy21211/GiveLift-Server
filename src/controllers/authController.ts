import { Request, Response } from "express-serve-static-core";
import IAuthUseCase from "../interfaces/use-cases/authUseCase.interface.js";
import {
  ForgetPasswordDto,
  LoginUserDto,
  RegisterUserDto,
  VerifyForgetPasswordDto,
} from "../interfaces/dtos/userDtos.js";
import {
  forgetPasswordDtoValidator,
  userCreateValidator,
  userLoginValidator,
} from "../infrastructure/utils/validation.js";
import { STATUS_CODES, USER_MESSAGES } from "../constants/statusCodes.js";
import Logger from "../infrastructure/utils/logger.js";

class AuthController {
  constructor(private _userUseCase: IAuthUseCase) {}

  async register(req: Request<{}, {}, RegisterUserDto>, res: Response) {
    const { body } = req;

    // Validate user input using Joi
    const { error } = userCreateValidator.validate(body);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }

    try {
      // Create and save user in the database
      const newUser = await this._userUseCase.createAndSaveUser(body);
      return res.status(STATUS_CODES.OK).json({
        message: USER_MESSAGES.REGISTRATION_SUCCESS,
        token: newUser.token,
      });
    } catch (error: any) {
      Logger.error(error);
      return res
        .status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          message: error.message || USER_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }

  async login(req: Request<{}, {}, LoginUserDto>, res: Response) {
    const { body } = req;

    // Validate user input using Joi
    const { error } = userLoginValidator.validate(body);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }

    try {
      const existingUser = await this._userUseCase.authenticateUser(
        body.email,
        body.password
      );

      return res.status(STATUS_CODES.OK).json({
        message: USER_MESSAGES.LOGIN_SUCCESS,
        token: existingUser.token,
      });
    } catch (error: any) {
      Logger.error(error);
      return res
        .status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          message: error.message || USER_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }

  async forgetPassword(req: Request<{}, {}, ForgetPasswordDto>, res: Response) {
    const { body } = req;

    // Validate user input using Joi
    const { error } = forgetPasswordDtoValidator.validate(body);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    try {
      // Send password reset otp to the user's phone number
      const user = await this._userUseCase.sendOtpForForgetPassword(body.phone);

      console.log(user);

      res.cookie("email", user.email, {
        // 5minutes expiry
        expires: new Date(Date.now() + 5 * 60 * 1000),
        httpOnly: true,
        secure: false,
      });

      return res.status(STATUS_CODES.OK).json({
        message: USER_MESSAGES.OTP_SEND,
      });
    } catch (error: any) {
      Logger.error(error);
      return res
        .status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          message: error.message || USER_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }

  async verifyForgetPassword(
    req: Request<{}, {}, VerifyForgetPasswordDto>,
    res: Response
  ) {
    try {
      const { body } = req;
      const email:string = req.cookies.email;

      await this._userUseCase.verifyOtpForForgetPassword(email, body.otp);
      return res.status(STATUS_CODES.OK).json({
        message: USER_MESSAGES.OTP_VERIFICATION_SUCCESS,
      });
    } catch (error: any) {
      Logger.error(error);
      return res
        .status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          message: error.message || USER_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }
}

export default AuthController;
