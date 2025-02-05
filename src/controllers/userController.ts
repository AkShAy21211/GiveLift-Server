import { ParamsDictionary, Request, Response } from "express-serve-static-core";
import { RegisterUserDto } from "../dtos/userDtos.js";
import { updateUserSchema } from "../infrastructure/utils/validation.js";
import UserUseCase from "../domain/usecases/userUseCase.js";
import Logger from "../infrastructure/utils/logger.js";
import STATUS_CODES from "../constants/statusCodes.js";
import STATUS_MESSAGES from "../constants/statusMessages.js";

class UserController {
  constructor(private _userUseCase: UserUseCase) {}

  async updateUserProfile(
    req: Request<ParamsDictionary, {}, Partial<RegisterUserDto>>,
    res: Response
  ) {
    const { userId } = req.params;
    const { body } = req;
    const { error } = updateUserSchema.validate(body);

    if (!userId) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: STATUS_MESSAGES.USER_NOT_FOUND,
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
          message: STATUS_MESSAGES.USER_UPDATE_FAILED,
        });
      }
      res.status(STATUS_CODES.OK).json(updatedUser);
    } catch (error: any) {
      Logger.error(error);
      return res
        .status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({
          message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }
}

export default UserController;
