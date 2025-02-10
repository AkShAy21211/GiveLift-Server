import DisasterReport from "../entities/Disaster.js";

interface IDisasterRepository{
    create(disaster:DisasterReport):Promise<DisasterReport|null>;
    findById(id: string): Promise<DisasterReport|null>;
    findAll(limit:number,page:number,skip:number): Promise<DisasterReport[]|[]>;
    countDocuments():Promise<number>;


}

export default IDisasterRepository;