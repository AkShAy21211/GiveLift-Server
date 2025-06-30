import Donation from "../entities/Donation";

interface IDonationUseCase {
    
    /**
     * Create a new donation
     * @param donation 
     */
    createDonation(donation: Donation): Promise<Donation>;

    /**
     * Get all donations
     */
    getAllDonations(): Promise<Donation[]>;

    /**
     * Get a donation by id
     * @param id 
     */
    getDonationById(id: string): Promise<Donation>;

    /**
     * Update a donation
     * @param id 
     * @param donation 
     */
    updateDonation(id: string, donation: Donation): Promise<Donation>;

}
export default IDonationUseCase;