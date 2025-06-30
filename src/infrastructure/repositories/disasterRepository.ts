import { Model } from "mongoose";
import { DisasterReport } from "../../domain/entities/Disaster";
import IDisasterRepository from "../interfaces/IDisasterRepository";
import { RepositoryError } from "../../shared/errors/RepositoryError";

class DisasterRepository implements IDisasterRepository {
  constructor(private readonly disasterModel: Model<DisasterReport>) {}
  async updateById(id: string, disaster: Partial<DisasterReport>): Promise<DisasterReport | null> {
    try {
      const updatedDisaster = await this.disasterModel.findByIdAndUpdate(
        id,
        { $set: disaster },
        { new: true } 
      );
  
      return updatedDisaster;
    } catch (error) {
      throw new RepositoryError("Error updating disaster");
    }
  }
  
  find({
    filters,
    sort,
    page,
    limit,
  }: {
    filters?: Record<string, any>;
    sort?: any;
    page?: number;
    limit?: number;
  }): Promise<DisasterReport[]> {
    try {
      const query = {} as any;

      // Dynamically build filter query
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value === undefined) continue;

          query[key] = value;
        }
      }

      // Handle sort
      const sortOption = {} as any;
      if (sort) {
        const [field, order] = sort.split("_");
        sortOption[field] = order === "desc" ? -1 : 1;
      }
      let skip;
      if (page && limit) {
        skip = (page - 1) * limit;
      }

      return this.disasterModel
        .find(query)
        .sort(sortOption)
        .skip(skip as number)
        .limit(limit as number);
    } catch (error) {
      throw new RepositoryError("Error finding disaster report");
    }
  }
  async create(disaster: DisasterReport): Promise<DisasterReport> {
    try {
      return this.disasterModel.create(disaster);
    } catch (error) {
      throw new RepositoryError("Error creating disaster report");
    }
  }
}

export default DisasterRepository;
