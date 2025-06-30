import { DisasterReport } from "../entities/Disaster";

interface IDisasterUseCase {
    
    getAll(queryParams?: object): Promise<DisasterReport[]>;
    create(disaster: DisasterReport): Promise<DisasterReport>;
    update(id: string, disaster: DisasterReport): Promise<DisasterReport>;
}

export default IDisasterUseCase;