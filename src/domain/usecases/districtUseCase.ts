import IDistrictRepository from "../../infrastructure/interfaces/IDistrictRepository";
import { District } from "../entities/District";
import IDistrictUseCase from "../interfaces/IDistrictUseCase";

class DistrictUseCase implements IDistrictUseCase {
  
  constructor(private readonly _districtRepository: IDistrictRepository) {}


  async getAllDistricts(params?: {
    filters?: Record<string, any>;
    projection?: Record<string, 1>;
  }): Promise<District[]> {
    try {
      return await this._districtRepository.find({
        filters: params?.filters,
        projection: params?.projection,
      });
    } catch (error) {
      throw new Error("Error getting all districts");
    }
  }
}

export default DistrictUseCase;
