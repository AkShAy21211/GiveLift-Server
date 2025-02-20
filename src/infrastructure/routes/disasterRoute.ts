import express from "express";
import DisasterRepository from "../repositories/disasterRepository.js";
import { Request, Response } from "express-serve-static-core";
import DisasterUseCase from "../../domain/usecases/disasterUseCase.js";
import DisasterController from "../../controllers/disasterController.js";
import { upload } from "../middlewares/multer.js";
import CloudinaryService from "../services/cloudinaryService.js";
const router = express.Router();

const disasterRepository = new DisasterRepository();
const cloudnary = new CloudinaryService();
const disasterUseCase = new DisasterUseCase(disasterRepository,cloudnary);
const disasterController = new DisasterController(disasterUseCase

);

// 🔹 fetch all disaster reports
router.get("/", (req: Request, res: Response) => {
  disasterController.fetchAllDisasters(req, res);
});

// fetch disaster report by id
router.get("/:id", (req: Request, res: Response) => {
  disasterController.fetchDisasterById(req, res);
});
// 🔹 create new disaster report
router.post("/report", upload.array("image"), (req: Request, res: Response) => {
  disasterController.createNewDisasterReport(req, res);
});

export default router;
