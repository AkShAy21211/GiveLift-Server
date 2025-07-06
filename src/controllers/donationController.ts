import { Request, Response } from "express-serve-static-core";
import IDonationUseCase from "../domain/interfaces/IDonationUseCase";
import { CreateDonationDto } from "../dtos/donationDtos";

class DonationController {
  constructor(private _donationUseCase: IDonationUseCase) {}
  async createDonation(req: Request<{}, {}, CreateDonationDto>, res: Response) {
    const donation = req.body as any;
    const _id = req.currentUser?._id as any;
    try {
      await this._donationUseCase.createDonation(_id, donation);
      res.status(200).json({
        message:
          "Donation requested successfully your donation will be verfied soon",
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }

  async getDonations(req: any, res: any) {
    // TODO: Implement getDonations
    res.status(200).json({ message: "getDonations" });
  }
}

export default DonationController;
