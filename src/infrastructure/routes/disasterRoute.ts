import express from "express";
import DisasterRepository from "../repositories/disasterRepository.js";
import { Request, Response } from "express-serve-static-core";
import DisasterUseCase from "../../domain/usecases/disasterUseCase.js";
import DisasterController from "../../controllers/disasterControoler.js";

const router = express.Router();


const disasterRepository = new DisasterRepository();

const disasterUseCase = new DisasterUseCase(
  disasterRepository,
);
const disasterController = new DisasterController(disasterUseCase);


// 🔹 fetch all disaster reports
router.get("/", (req: Request, res: Response) => {
  disasterController.fetchAllDisasters(req, res);
});
// 🔹 create new disaster report
router.post("/report", (req: Request, res: Response) => {
  disasterController.createNewDisasterReport(req, res);
});



export default router;
