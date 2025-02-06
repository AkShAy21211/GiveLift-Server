import DisasterReport from "../../domain/entities/Disaster.js";
import IDisasterRepository from "../../domain/interfaces/disasterRepository.interface.js";
import DisasterReportModel from "../models/disaster.js";
import Logger from "../utils/logger.js";

class DisasterRepository implements IDisasterRepository {
  async create(disaster: DisasterReport): Promise<DisasterReport | null> {
    try {
      const newDisaster = new DisasterReportModel(disaster);
      await newDisaster.save();
      return newDisaster.toObject();
    } catch (error: any) {
      Logger.error(error.message);
      return null;
    }
  }
  findById(id: string): Promise<DisasterReport | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<DisasterReport[]> {
    throw new Error("Method not implemented.");
  }
}
