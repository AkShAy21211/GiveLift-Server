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

    const { error } = disasterReportValidationSchema.validate(body);

    if (error) {
       res.status(STATUS_CODES.BAD_REQUEST).json({
        message: STATUS_MESSAGES.USER_NOT_FOUND,
      });
      return;
    }
    try {
      const newDisaster = await this._disasterUseCase.createAndSaveDisaster(body);
      res.status(201).send();
    } catch (error:any) {
      res.status(500).send(error.message);
    }
  }
}
