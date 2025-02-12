import express from "express";
import UserRepository from "../repositories/userRepository.js";
import { Request, Response } from "express-serve-static-core";
import UserUseCase from "../../domain/usecases/userUseCase.js";
import UserController from "../../controllers/userController.js";


const router = express.Router();


// �� Set up dependencies in the auth controller
const userRepository = new UserRepository();

const userUseCase = new UserUseCase(
  userRepository,
);
const userController = new UserController(userUseCase);

// 🔹 update user profile
router.put("/update-profile", (req: Request, res: Response) => {
  userController.updateUserProfile(req, res);
});


router.get("/me", (req: Request, res: Response) => {
  userController.fetchUserById(req, res);
});


// �� Login an existing user


export default router;
