import { Request, Response } from "express-serve-static-core";
import DisasterUseCase from "../domain/usecases/disasterUseCase.js";
import DisasterReportDto from "../dtos/disasterDto.js";
import { disasterReportValidationSchema } from "../infrastructure/utils/validation.js";
import STATUS_CODES from "../constants/statusCodes.js";
import STATUS_MESSAGES from "../constants/statusMessages.js";
import Logger from "../infrastructure/utils/logger.js";

class DisasterController {
  constructor(private _disasterUseCase: DisasterUseCase) {}

  async createNewDisasterReport(
    req: Request<{}, {}, DisasterReportDto>,
    res: Response
  ): Promise<void> {
    const { body } = req;
    const cookie = req.cookies.currentUser;
    const currentUser: { role: string; _id: string; token: string } = cookie
      ? JSON.parse(cookie)
      : null;
    const { error } = disasterReportValidationSchema.validate(body);

    if (!currentUser) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        message: STATUS_MESSAGES.ACCESS_DENIED,
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
      await this._disasterUseCase.createAndSaveDisaster(
        currentUser._id,
        currentUser.role,
        body
      );

      res.status(STATUS_CODES.CREATED).json({
        message: STATUS_MESSAGES.DISASTER_REPORTED,
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

  async fetchAllDisasters(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    try {
      const data = await this._disasterUseCase.getchAllDisaster(
        limit,
        page,
        skip
      );
      res.status(STATUS_CODES.OK).json( data );
    } catch (error: any) {
      Logger.error(error);
      res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: error.message || STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default DisasterController;
