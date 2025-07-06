import { District } from "../entities/District";

interface IDistrictUseCase {
    
    getAllDistricts(params?: {
        filters?: Record<string, any>;
        projection?: Record<string, 1>;
      }): Promise<District[]>;}

export default IDistrictUseCase