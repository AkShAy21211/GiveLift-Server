import express from "express";
import { Request, Response } from "express-serve-static-core";
import UserController from "../../controllers/userController";
import UserUseCase from "../../domain/usecases/userUseCase";
import UserRepository from "../repositories/userRepository";
import UserModel from "../models/user";
import { validate } from "../middlewares/validate";
import { createUser, updateUser } from "../validation/user";

const router = express.Router();

const userController = new UserController(
  new UserUseCase(new UserRepository(UserModel))
);

router.get("/", (req, res) => {
  userController.getUserController(req, res);
});
router.post("/create", validate(createUser),(req, res) => {
  userController.createUserController(req, res);
});

router.put(
  "/:id",
  validate(updateUser),
  (req: Request<{ id: string }>, res: Response) => {
    userController.updateUserController(req, res);
  }
);

router.patch("/:id/deactivate", (req, res) => {
  userController.deActivateUserController(req, res);
});

router.patch("/:id/restore", (req, res) => {
  userController.restoreUserController(req, res);
});

router.get("/me", (req, res) => {
  userController.getUserProfileController(req, res);
});

export default router;
