import express from "express";
import UserRepository from "../repositories/userRepository.js";
import UserUseCase from "../../usecases/userUseCase.js";
import UserController from "../../controllers/authController.js";
import BCrypt from "../utils/bcrypt.js";
import { Request, Response } from "express-serve-static-core";
import JsonWebToken from "../utils/jwt.js";

const router = express.Router();


const bcrypt = new BCrypt();
const jwt = new JsonWebToken();

// �� Set up dependencies in the auth controller
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository, bcrypt,jwt);
const userController = new UserController(userUseCase);

// 🔹 Register a new user
router.post("/sign-up", (req: Request, res: Response) => {
  userController.register(req, res);
});

// �� Login an existing user

router.post("/sign-in", (req: Request, res: Response) => {
  userController.login(req, res);
});

export default router;
