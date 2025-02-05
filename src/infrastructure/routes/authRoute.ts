import express from "express";
import UserRepository from "../repositories/userRepository.js";
import AuthUseCase from "../../domain/usecases/authUseCase.js";
import AuthController from "../../controllers/authController.js";
import BCrypt from "../utils/bcrypt.js";
import { Request, Response } from "express-serve-static-core";
import JsonWebToken from "../utils/jwt.js";
import OtpRepository from "../repositories/otpRepository.js";
import Twilio from "../../infrastructure/services/twilioService.js";

const router = express.Router();

const bcrypt = new BCrypt();
const jwt = new JsonWebToken();
const otpRepository = new OtpRepository();
const otpManager = new Twilio();

// �� Set up dependencies in the auth controller
const userRepository = new UserRepository();

const authUseCase = new AuthUseCase(
  userRepository,
  bcrypt,
  jwt,
  otpRepository,
  otpManager
);
const authController = new AuthController(authUseCase);

// 🔹 Register a new user
router.post("/sign-up", (req: Request, res: Response) => {
  authController.register(req, res);
});

// �� Login an existing user

router.post("/sign-in", (req: Request, res: Response) => {
  authController.login(req, res);
});

router.post("/forget-password", (req: Request, res: Response) => {
  authController.forgetPassword(req, res);
});



router.post("/forget-password/verify", (req: Request, res: Response) => {
  authController.verifyForgetPassword(req, res);
});
export default router;
