import IDisasterRepository from "../../infrastructure/interfaces/IDisasterRepository";
import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import { RepositoryError } from "../../shared/errors/RepositoryError";
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
      throw new Error("Error updating disaster");
    }
  }
  async getAll(queryParams?: any): Promise<Disaster[]> {
    try {
      return await this._disasterRepository.find(queryParams);
    } catch (error) {
      throw new Error("Error fetching disasters");
    }
  }
  async create(disaster: Disaster): Promise<Disaster> {
    try {
      const coordinates = await geocodeAddress(disaster?.address as string);

      const newDisaster = {
        ...disaster,
        address: {
          type: "Point",
          coordinates: coordinates as [number, number],
          label: disaster?.address as string,
        },
      };
      return await this._disasterRepository.create(newDisaster as Disaster);
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw new Error("Error creating disaster");
      }
      throw error;
    }
  }
}

export default DisasterUseCase;
