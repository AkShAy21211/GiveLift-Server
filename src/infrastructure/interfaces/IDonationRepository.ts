import Donation from "../../domain/entities/Donation";

interface IDonationRepository {
    
    create(donation: Donation): Promise<Donation>;
}
export default IDonationRepository;