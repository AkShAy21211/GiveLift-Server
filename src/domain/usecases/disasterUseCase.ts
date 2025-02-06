import STATUS_CODES from "../../constants/statusCodes.js";
import STATUS_MESSAGES from "../../constants/statusMessages.js";
import AppError from "../../infrastructure/utils/AppError.js";
import DisasterReport from "../entities/Disaster.js";
import IDisasterRepository from "../interfaces/disasterRepository.interface.js";

class DisasterUseCase {
  constructor(private _disasterRepository: IDisasterRepository) {}

  async createAndSaveDisaster(disaster: DisasterReport): Promise<boolean> {
    try {
      const newDisaster = await this._disasterRepository.create(disaster);

      if (!newDisaster) {
        throw new AppError(
          STATUS_MESSAGES.DISASTER_REPORT_FAILED,
          STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }
      return true;
    } catch (error: any) {
      throw new AppError(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export default DisasterUseCase;