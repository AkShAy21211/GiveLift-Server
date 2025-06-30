import { Request, Response } from "express-serve-static-core";
import IDonationUseCase from "../domain/interfaces/IDonationUseCase";
import { DonationDto } from "../dtos/donationDtos";

class DonationController {
  constructor(private _donationUseCase: IDonationUseCase) {}
  async createDonation(req: Request, res: Response) {
    const donation = req.body;
    const _id =  req.currentUser?._id;
    try {
      const response = await this._donationUseCase.createDonation({
        ...donation,
        donatedBy: _id,
      });
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
