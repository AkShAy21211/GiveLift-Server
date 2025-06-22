import express from "express";
import UserAuthController from "../../controllers/userAuthController";
import UserAuthUseCase from "../../domain/usecases/userAuthUseCase";
import UserRepository from "../repositories/userRepository";
import { validate } from "../middlewares/validate";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, stateCoordinatorSchema } from "../../utils/validation";
import BCrypt from "../../utils/bcrypt";
import JsonWebToken from "../../utils/jwt";
import EmailService from "../services/emailService";
import resend from "../../config/resend";

const route = express.Router();

const userAuthContoller = new UserAuthController(
  new UserAuthUseCase(new UserRepository(), new BCrypt(), new JsonWebToken(),new EmailService(resend))
);

route.post("/initialize/state-coordinator",validate(stateCoordinatorSchema),(req,res)=>{
  userAuthContoller.initializeStateCoordinatorController(req,res)
})

route.post("/register", validate(registerSchema), (req, res) => {
  userAuthContoller.registerController(req, res);
});
route.post("/login", validate(loginSchema), (req, res) => {
  userAuthContoller.loginController(req, res);
});


route.post("/forgot-password", validate(forgotPasswordSchema), (req, res) => {
  userAuthContoller.forgotPasswordController(req, res);
});



route.post("/reset-password", validate(resetPasswordSchema), (req, res) => {
  userAuthContoller.resetPasswordController(req, res);
});


export default route;
