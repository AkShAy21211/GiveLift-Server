import express from "express";
import { Request, Response } from "express-serve-static-core";
import DistrictController from "../../controllers/districtController";
import DistrictUseCase from "../../domain/usecases/districtUseCase";
import DistrictRepository from "../repositories/districtRepository";
import DistrictModel from "../models/district";

const router = express.Router();

const districtController = new DistrictController(
  new DistrictUseCase(new DistrictRepository(DistrictModel))
);
router.get("/", (req: Request, res: Response) => {
  districtController.getDistricts(req, res);
});

export default router;
