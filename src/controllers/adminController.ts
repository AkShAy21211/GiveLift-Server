import { Request, Response } from "express-serve-static-core";
import AdminUseCase from "../domain/usecases/adminUseCase.js";
import { RegisterUserDto } from "../dtos/userDtos.js";
import { userCreateValidator } from "../infrastructure/utils/validation.js";
import STATUS_CODES from "../constants/statusCodes.js";
import STATUS_MESSAGES from "../constants/statusMessages.js";
import Logger from "../infrastructure/utils/logger.js";

class AdminController {
  constructor(private _adminUseCase: AdminUseCase) {}

  async create(
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
      const savedData = await this._adminUseCase.createCordinator(body);

      res.status(STATUS_CODES.OK).json({
        message: STATUS_MESSAGES.REGISTRATION_SUCCESS,
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

  async fetchCoordinators(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
      const data = await this._adminUseCase.getCoordinators(limit, skip);
      

      
      res.status(STATUS_CODES.OK).json({
        total: data?.totalCoordinators,
        totalPages: Math.ceil((data?.totalCoordinators as number) / limit),
        currentPage: page,
        data: data?.coordinators,
      });

      return;
    } catch (error: any) {
      Logger.error(error);
      res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default AdminController;
