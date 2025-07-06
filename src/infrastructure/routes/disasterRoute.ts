import express from "express";
import DisasterController from "../../controllers/disasterController";
import DisasterUseCase from "../../domain/usecases/disasterUseCase";
import DisasterRepository from "../repositories/disasterRepository";
import UserRepository from "../repositories/userRepository";
import UserModel from "../models/user";
import {
  createDisasterReportSchema,
  updateDisasterReportSchema,
} from "../validation/disaster";
import { validate } from "../middlewares/validate";
import DisasterModel from "../models/disaster";

const router = express.Router();

const disasterController = new DisasterController(
  new DisasterUseCase(
    new DisasterRepository(DisasterModel),
    new UserRepository(UserModel)
  )
);

router.get("/", (req, res) => {
  disasterController.getAllDisasters(req, res);
});

router.post("/report", (req, res) => {
  disasterController.reportDisaster(req, res);
});

router.put("/:id", validate(updateDisasterReportSchema), (req, res) => {
  disasterController.updateDisaster(req, res);
});

export default router;
