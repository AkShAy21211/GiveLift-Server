import { Model } from "mongoose";
import { RepositoryError } from "../../shared/errors/RepositoryError";
import IDistrictRepository from "../interfaces/IDistrictRepository";
import { District } from "../../domain/entities/District";
import { Disaster } from "../../domain/entities/Disaster";

class DistrictRepository implements IDistrictRepository {
  constructor(private readonly _districtModel: Model<District>) {}
  async find({
    filters,
    projection,
  }: {
    filters?: Record<string, any>;
    projection?: Record<string, 1>;
  }): Promise<District[]> {
    try {
      const query: Record<string, any> = {};

      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value === undefined) continue;
          query[key] = value;
        }
      }

      return await this._districtModel.find(query, projection);
    } catch (error) {
      throw new RepositoryError("Error in find district");
    }
  }
}

export default DistrictRepository;
