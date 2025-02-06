import express from "express";
import DisasterRepository from "../repositories/disasterRepository.js";
import { Request, Response } from "express-serve-static-core";
import DisasterUseCase from "../../domain/usecases/disasterUseCase.js";
import DisasterController from "../../controllers/disasterControoler.js";

const router = express.Router();


// �� Set up dependencies in the auth controller
const userRepository = new DisasterRepository();

const userUseCase = new DisasterUseCase(
  userRepository,
);
const userController = new DisasterController(userUseCase);

// 🔹 create new disaster report
router.post("/create", (req: Request, res: Response) => {
  userController.createNewDisasterReport(req, res);
});



export default router;
