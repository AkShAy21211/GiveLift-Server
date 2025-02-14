import express from "express";
import UserRepository from "../repositories/userRepository.js";
import BCrypt from "../utils/bcrypt.js";
import { Request, Response } from "express-serve-static-core";
import JsonWebToken from "../utils/jwt.js";
import AdminController from "../../controllers/adminController.js";
import AdminUseCase from "../../domain/usecases/adminUseCase.js";

const router = express.Router();

const bcrypt = new BCrypt();
const jwt  = new JsonWebToken()

// �� Set up dependencies in the auth controller
const userRepository = new UserRepository();

const authUseCase = new AdminUseCase(userRepository, bcrypt);
const authController = new AdminController(authUseCase);

// 🔹 Register a new user
router.post("/create-coordinator", (req: Request, res: Response) => {
  authController.create(req, res);
});

router.get("/coordinators", (req: Request, res: Response) => {
  authController.fetchCoordinators(req, res);
});
export default router;
