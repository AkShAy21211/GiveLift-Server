import IDonationRepository from "../../infrastructure/interfaces/IDonationRepository";
import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import Donation from "../entities/Donation";
import IDonationUseCase from "../interfaces/IDonationUseCase";

class DonationUseCase implements IDonationUseCase {
  constructor(
    private _repository: IDonationRepository,
    private _userRepo: IUserRepository
  ) {}
  async createDonation(donation: Donation): Promise<Donation> {
    try {
      const donatedUser = await this._userRepo.findById(
        donation.donatedBy as string
      );
      const country = (donatedUser?.country as any) || "";
      const state = (donatedUser?.state as any) || "";
      const district = (donatedUser?.district as any) || "";

      return await this._repository.create({
        ...donation,
        country,
        state,
        district,
      });
    } catch (error) {
      throw error;
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
