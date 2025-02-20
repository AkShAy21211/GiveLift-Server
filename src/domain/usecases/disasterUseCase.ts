import STATUS_CODES from "../../constants/statusCodes.js";
import STATUS_MESSAGES from "../../constants/statusMessages.js";
import ICloudinaryService from "../../infrastructure/interfaces/cloudnaryService.interface.js";
import AppError from "../../infrastructure/utils/AppError.js";
import Logger from "../../infrastructure/utils/logger.js";
import DisasterReport from "../entities/Disaster.js";
import USER_ROLE from "../enum/userRole.js";
import IDisasterRepository from "../interfaces/disasterRepository.interface.js";

class DisasterUseCase {
  constructor(
    private _disasterRepository: IDisasterRepository,
    private _cloudnary: ICloudinaryService
  ) {}

  async createAndSaveDisaster(
    userId: string,
    disaster: DisasterReport,
    images:Express.Multer.File[]
  ): Promise<boolean> {
    try {
      const media:string[] = []
      disaster.reportedBy = userId;


      if(images.length>0){

        for(const image of images){
          const uploadedImage = await this._cloudnary.uploadFile(image,"Disasters");
          media.push(uploadedImage.secure_url);
        }
      }
      disaster.media = media;
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

  async getchAllDisaster(
    limit: number,
    page: number,
    skip: number
  ): Promise<{ disasters: DisasterReport[]; total: number }> {
    try {
      const disasters = await this._disasterRepository.findAll(
        limit,
        page,
        skip
      );
      const totalDisasters = await this._disasterRepository.countDocuments();
      return {
        disasters,
        total: totalDisasters,
      };
    } catch (error: any) {
      throw new AppError(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  async getDisasterById(disasterId: string): Promise<DisasterReport> {
    try {
      const disaster = await this._disasterRepository.findById(disasterId);
      if (!disaster) {
        throw new AppError(
          STATUS_MESSAGES.DISASTER_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }

      return disaster;
    } catch (error: any) {
      throw new AppError(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export default DisasterUseCase;
