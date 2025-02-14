import express from "express";
import UserRepository from "../repositories/userRepository.js";
import BCrypt from "../utils/bcrypt.js";
import { Request, Response } from "express-serve-static-core";
import AdminAuthUseCase from "../../domain/usecases/adminAuthUseCase.js";
import AdminAuthController from "../../controllers/adminAuthController.js";
import JsonWebToken from "../utils/jwt.js";

const router = express.Router();

const bcrypt = new BCrypt();
const jwt  = new JsonWebToken()

// �� Set up dependencies in the auth controller
const userRepository = new UserRepository();

const authUseCase = new AdminAuthUseCase(userRepository, bcrypt,jwt);
const authController = new AdminAuthController(authUseCase);

// 🔹 Register a new user
router.post("/sign-up", (req: Request, res: Response) => {
  authController.registerAdmin(req, res);
});

router.post("/sign-in", (req: Request, res: Response) => {
  authController.login(req, res);
});

// �� Login an existing user

export default router;
