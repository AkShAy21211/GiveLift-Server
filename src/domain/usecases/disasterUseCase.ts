import IDisasterRepository from "../../infrastructure/interfaces/IDisasterRepository";
import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import { geocodeAddress } from "../../utils/map";
import { Disaster } from "../entities/Disaster";
import IDisasterUseCase from "../interfaces/IDisasterUseCase";

class DisasterUseCase implements IDisasterUseCase {
  constructor(
    private _disasterRepository: IDisasterRepository,
    private _userRepoitory: IUserRepository
  ) {}
  async update(id: string, disaster: Partial<Disaster>): Promise<void> {
    try {
      await this._disasterRepository.updateById(id, disaster);
    } catch (error) {
      throw error;
    }
  }
  async getAll(queryParams?: any): Promise<Disaster[]> {
    try {
      return await this._disasterRepository.find(queryParams);
    } catch (error) {
      throw error;
    }
  }
  async create(disaster: Disaster): Promise<Disaster> {
    try {
      const coordinates = await geocodeAddress(disaster?.address as string);
      
      const newDisaster: any = {
        ...disaster,
        location: {
          type: "Point",
          coordinates: coordinates as any,
        },
      };
      return await this._disasterRepository.create(newDisaster);
    } catch (error) {
      throw error;
    }
  }
}

export default DisasterUseCase;
