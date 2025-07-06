import { Disaster } from "../entities/Disaster";

interface IDisasterUseCase {
    
    getAll(queryParams?: object): Promise<Disaster[]>;
    create(disaster: Disaster): Promise<Disaster>;
    update(id: string, disaster: Partial<Disaster>): Promise<void>;
}

export default IDisasterUseCase;