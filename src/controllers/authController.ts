import { Request, Response } from "express-serve-static-core";

import IUserUseCase from "../interfaces/use-cases/userUseCase.interface.js";
import { LoginUserDto, RegisterUserDto } from "../interfaces/dtos/userDtos.js";
import {
  userCreateValidator,
  userLoginValidator,
} from "../infrastructure/utils/validation.js";
import { STATUS_CODES, USER_MESSAGES } from "../constants/statusCodes.js";
import Logger from "../infrastructure/utils/logger.js";

class UserController {
  constructor(private _userUseCase: IUserUseCase) {}

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

  forgetPassword(req:Request,res:Response){
    
  }
}

export default UserController;
