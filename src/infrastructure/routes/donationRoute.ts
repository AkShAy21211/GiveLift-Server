import express from "express";
import DonationController from "../../controllers/donationController";
import DonationUseCase from "../../domain/usecases/donationUseCase";
import DonationRepository from "../repositories/donationRepository";
import DonationModel from "../models/donation";
import UserRepository from "../repositories/userRepository";
import UserModel from "../models/user";
import { authenticate } from "../middlewares/auth";

const route = express.Router();

const donationController = new DonationController(
  new DonationUseCase(
    new DonationRepository(DonationModel),
    new UserRepository(UserModel)
  )
);

route.post("/create", authenticate,(req, res) => {
  donationController.createDonation(req, res);
});

export default route;
