import express from "express";
import UserController from "../../controllers/userController";
import UserUseCase from "../../domain/usecases/userUseCase";
import UserRepository from "../repositories/userRepository";
import UserModel from "../models/user";

const router = express.Router();

const userController = new UserController(
  new UserUseCase(new UserRepository(UserModel))
);


router.get("/", (req, res) => {
  userController.getUserController(req, res);
})
router.post("/create", (req, res) => {
  userController.createUserController(req, res);
});


router.put("/:id", (req, res) => {
  userController.updateUserController(req, res);
});

router.get("/me",(req,res)=>{
  userController.getUserProfileController(req,res);
})


router.patch("/:id/deactivate", (req, res) => {
  userController.deActivateUserController(req, res);
});


router.patch("/:id/restore", (req, res) => {
  userController.restoreUserController(req, res);
});


export default router;