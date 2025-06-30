import { Model } from "mongoose";
import Donation from "../../domain/entities/Donation";
import IDonationRepository from "../interfaces/IDonationRepository";
import { RepositoryError } from "../../shared/errors/RepositoryError";

class DonationRepository implements IDonationRepository {
  constructor(private readonly _donationModel: Model<Donation>) {}
  async create(donation: Donation): Promise<Donation> {
    try {
      console.log(donation);
      
      return await this._donationModel.create(donation);
    } catch (error) {
      console.error(error);
      throw new RepositoryError("Error creating donation");
    }
  }
}
export default DonationRepository;
