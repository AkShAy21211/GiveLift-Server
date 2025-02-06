import DisasterReport from "../entities/Disaster.js";

interface IDisasterRepository{
    create(disaster:DisasterReport):Promise<DisasterReport|null>;
    findById(id: string): Promise<DisasterReport|null>;
    findAll(): Promise<DisasterReport[]>;


}

export default IDisasterRepository;