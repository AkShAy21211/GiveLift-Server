import express from "express";
import UserRepository from "../repositories/userRepository.js";
import { Request, Response } from "express-serve-static-core";
import UserUseCase from "../../usecases/userUseCase.js";
import UserController from "../../controllers/userController.js";


const router = express.Router();


// �� Set up dependencies in the auth controller
const userRepository = new UserRepository();

const userUseCase = new UserUseCase(
  userRepository,
);
const userController = new UserController(userUseCase);

// 🔹 Register a new user
router.put("/update/:userId", (req: Request, res: Response) => {
  userController.updateUserProfile(req, res);
});

// �� Login an existing user


export default router;
