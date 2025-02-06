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
  ): Promise<void> {
    const { userId } = req.params;
    const { body } = req;
    const { error } = updateUserSchema.validate(body);

    if (!userId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: STATUS_MESSAGES.USER_NOT_FOUND,
      });
      return;
    }
    if (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.details[0].message,
      });
      return;
    }

    try {
      await this._userUseCase.getUserByIdAndUpdate(userId, body);

      res.status(STATUS_CODES.OK).json({
        message: STATUS_MESSAGES.USER_UPDATE_SUCCESS,
      });
    } catch (error: any) {
      Logger.error(error);
      res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
      return;
    }
  }
}

export default UserController;
