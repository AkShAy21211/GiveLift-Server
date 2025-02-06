import { Request, Response } from "express-serve-static-core";
import DisasterUseCase from "../domain/usecases/disasterUseCase.js";
import DisasterReportDto from "../dtos/disasterDto.js";
import { disasterReportValidationSchema } from "../infrastructure/utils/validation.js";
import STATUS_CODES from "../constants/statusCodes.js";
import STATUS_MESSAGES from "../constants/statusMessages.js";

class DisasterController {
  constructor(private _disasterUseCase: DisasterUseCase) {}

  async createNewDisaster(
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
    }

    if (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.details[0].message,
      });
      return;
    }
    try {
      await this._disasterUseCase.createAndSaveDisaster(
        cookie._id,
        cookie.role,
        body
      );

      res.status(STATUS_CODES.CREATED).json({
        message: STATUS_MESSAGES.DISASTER_REPORTED,
      });
      return;
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
}


export default DisasterController;