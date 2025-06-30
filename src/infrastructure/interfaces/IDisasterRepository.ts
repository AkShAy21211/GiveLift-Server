import { DisasterReport } from "../../domain/entities/Disaster";

interface IDisasterRepository {
    
    
    find({filters, sort, page, limit}: { filters?: Record<string,any>; sort?: any; page?: number; limit?: number }): Promise<DisasterReport[]>;
    create(disaster: DisasterReport): Promise<DisasterReport>;
    updateById(id: string, disaster: Partial<DisasterReport>): Promise<DisasterReport | null> 
    }

export default IDisasterRepository