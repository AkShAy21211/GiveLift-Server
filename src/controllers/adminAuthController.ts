import { Request, Response } from "express-serve-static-core";
import AdminAuthUseCase from "../domain/usecases/adminAuthUseCase.js";
import STATUS_CODES from "../constants/statusCodes.js";
import STATUS_MESSAGES from "../constants/statusMessages.js";
import Logger from "../infrastructure/utils/logger.js";
import { LoginUserDto } from "../dtos/userDtos.js";
import { userLoginValidator } from "../infrastructure/utils/validation.js";
import ENVS from "../infrastructure/config/envConfig.js";

class AdminAuthController {
  constructor(private _adminAuthUseCase: AdminAuthUseCase) {}

  async registerAdmin(req: Request, res: Response): Promise<void> {
    try {
      const admin = await this._adminAuthUseCase.createAdmin();

      if (!admin) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          message: STATUS_MESSAGES.REGISTRATION_FAILED,
        });
        return;
      }
      res.status(STATUS_CODES.OK).json({
        message: STATUS_MESSAGES.REGISTRATION_SUCCESS,
      });
      return;
    } catch (error: any) {
      Logger.error(error.message);
      res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
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
      const savedData = await this._adminAuthUseCase.authenticateUser(
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
}

export default AdminAuthController;
