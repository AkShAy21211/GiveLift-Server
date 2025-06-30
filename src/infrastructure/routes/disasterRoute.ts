import express from "express";
import DisasterController from "../../controllers/disasterController";
import DisasterUseCase from "../../domain/usecases/disasterUseCase";
import DisasterRepository from "../repositories/disasterRepository";
import { DisasterReportModel } from "../models/disaster";
import UserRepository from "../repositories/userRepository";
import UserModel from "../models/user";

const router = express.Router();

const disasterController = new DisasterController(
  new DisasterUseCase(new DisasterRepository(DisasterReportModel), new UserRepository(UserModel))
);

router.get("/",(req,res)=>{
  disasterController.getAllDisasters(req,res);
})

router.put("/:id",(req,res)=>{
  disasterController.updateDisaster(req,res);
})
router.post("/report", (req, res) => {
  disasterController.reportDisaster(req, res);
});


export default router;
