import IDonationRepository from "../../infrastructure/interfaces/IDonationRepository";
import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import { Donation } from "../entities/Donation";
import IDonationUseCase from "../interfaces/IDonationUseCase";

class DonationUseCase implements IDonationUseCase {
  constructor(
    private _repository: IDonationRepository,
    private _userRepo: IUserRepository
  ) {}
  async createDonation(
    donatedBy: string,
    donation: Donation
  ): Promise<Donation> {
    try {
      const donatedUser = await this._userRepo.findById(donatedBy as string);

      const district = donatedUser?.address?.district || "";

      return await this._repository.create({
        ...donation,
        donatedBy,
        district,
      });
    } catch (error) {
      throw new Error("Error creating donation");
    }
  }
  async getAllDonations(): Promise<Donation[]> {
    throw new Error("Method not implemented.");
  }
  async getDonationById(id: string): Promise<Donation> {
    throw new Error("Method not implemented.");
  }
  async updateDonation(id: string, donation: Donation): Promise<Donation> {
    throw new Error("Method not implemented.");
  }
}

export default DonationUseCase;
