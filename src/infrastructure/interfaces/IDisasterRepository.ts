import { Disaster } from "../../domain/entities/Disaster";

interface IDisasterRepository {
    
    
    find({filters, sort, page, limit}: { filters?: Record<string,any>; sort?: any; page?: number; limit?: number }): Promise<Disaster[]>;
    create(disaster: Disaster): Promise<Disaster>;
    updateById(id: string, disaster: Partial<Disaster>): Promise<Disaster | null> 
    }

export default IDisasterRepository