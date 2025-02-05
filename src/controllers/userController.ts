import { ParamsDictionary, Request, Response } from "express-serve-static-core";
import {
  RegisterUserDto,
} from "../interfaces/dtos/userDtos.js";
import { STATUS_CODES, USER_MESSAGES } from "../constants/statusCodes.js";
import { updateUserSchema } from "../infrastructure/utils/validation.js";
import IUserUseCase from "../interfaces/use-cases/userUseCase.interface.js";
import Logger from "../infrastructure/utils/logger.js";

class UserController {
  constructor(private _userUseCase: IUserUseCase) {}

  async updateUserProfile(
    req: Request<ParamsDictionary, {}, Partial<RegisterUserDto>>,
    res: Response
  ) {
    const {userId}  = req.params;
    const { body } = req;
    const { error } = updateUserSchema.validate(body);

    if (!userId) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: USER_MESSAGES.USER_NOT_FOUND,
      });
    }
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }

    try {
      const updatedUser = await this._userUseCase.getUserByIdAndUpdate(
        userId,
        body
      );
      if (!updatedUser) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          message: USER_MESSAGES.USER_UPDATE_FAILED,
        });
      }
      res.status(STATUS_CODES.OK).json(updatedUser);
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

export default UserController;