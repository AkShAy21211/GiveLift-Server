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
  async findById(id: string): Promise<DisasterReport | null> {
    try {
      const disaster = DisasterReportModel.findById(id);
      return disaster.lean();
    } catch (error: any) {
      Logger.error(error.message);
      return null;
    }
  }
  async findAll(
    limit: number,
    page: number,
    skip: number
  ): Promise<DisasterReport[] | []> {
    try {
      const disasters = DisasterReportModel.find().skip(skip).limit(limit);
      return disasters.lean();
    } catch (error: any) {
      Logger.error(error.message);
      return [];
    }
  }

  async countDocuments(): Promise<number> {
    try {
      return await DisasterReportModel.countDocuments();
    } catch (error: any) {
      Logger.error(error.message);
      return 0;
    }
  }
}

export default DisasterRepository;
