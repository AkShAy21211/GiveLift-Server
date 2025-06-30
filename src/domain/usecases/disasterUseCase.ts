import IDisasterRepository from "../../infrastructure/interfaces/IDisasterRepository";
import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import extractNameOrId from "../../utils/extractNameOrId";
import { DisasterReport } from "../entities/Disaster";
import IDisasterUseCase from "../interfaces/IDisasterUseCase";

class DisasterUseCase implements IDisasterUseCase {
  constructor(
    private _disasterRepository: IDisasterRepository,
    private _userRepoitory: IUserRepository
  ) {}
  async update(id: string, disaster: DisasterReport): Promise<DisasterReport> {
    try {
      const updateData: Partial<DisasterReport> = {};

      if (disaster.place) updateData.place = disaster.place;
      if (disaster.situationDescription)
        updateData.situationDescription = disaster.situationDescription;
      if (disaster.disasterType)
        updateData.disasterType = disaster.disasterType;
      if (disaster.severityLevel)
        updateData.severityLevel = disaster.severityLevel;
      if (disaster.peopleAffected)
        updateData.peopleAffected = disaster.peopleAffected;
      if (disaster.resourcesNeeded)
        updateData.resourcesNeeded = disaster.resourcesNeeded;

      const updatedDisaster = await this._disasterRepository.updateById(
        id,
        updateData
      );
      return updatedDisaster as DisasterReport;
    } catch (error) {
      throw error;
    }
  }
  getAll(queryParams?: any): Promise<DisasterReport[]> {
    try {
      return this._disasterRepository.find(queryParams);
    } catch (error) {
      throw error;
    }
  }
  async create(disaster: DisasterReport): Promise<DisasterReport> {
    try {
      const user = await this._userRepoitory.findById(
        disaster.reportedBy as any
      );
      if (!user) throw new Error("User not found");

      const country = extractNameOrId(user?.country as any);
      const state = extractNameOrId(user?.state as any);
      const district = extractNameOrId(user?.district as any);
      return await this._disasterRepository.create({
        ...disaster,
        country,
        state,
        district,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default DisasterUseCase;
