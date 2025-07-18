import { Request, Response } from "express-serve-static-core";
import IUserAuthUseCase from "../domain/interfaces/IUserAuthUseCase";
import {
  InitStateCoordinatorDto,
  LoginUserDto,
  RegisterUserDto,
} from "../dtos/userDtos";
import ROLES from "../constants/roles";
import STATUS_MESSAGES from "../constants/statusMessages";

class UserAuthController {
  constructor(private _useCase: IUserAuthUseCase) {}

  async initializeStateCoordinatorController(
    req: Request<{}, {}, InitStateCoordinatorDto>,
    res: Response
  ) {
    const { name, email, password, phone, district } = req.body;
    try {
      const role = ROLES.STATE_COORDINATOR;
      await this._useCase.initializeStateCoordinator(
        name,
        email,
        phone,
        district,
        password,
        role
      );
      res.status(200).json({
        message: STATUS_MESSAGES.AUTH.REGISTER_SUCCESS,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }

  async registerController(
    req: Request<{}, {}, RegisterUserDto>,
    res: Response
  ) {
    const { name, email, phone, password, district } = req.body;
    const role = ROLES.GENERAL_USER;
    try {
      await this._useCase.register(
        name,
        email,
        phone,
        district,
        password,
        role
      );
      return res
        .status(201)
        .json({ message: STATUS_MESSAGES.AUTH.REGISTER_SUCCESS });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }
  async loginController(req: Request<{}, {}, LoginUserDto>, res: Response) {
    const { email, password } = req.body;

    try {
      const response = await this._useCase.login(email, password);

      res.cookie(
        "currentUser",
        JSON.stringify({
          token: response.token,
          _id: response.user._id,
          role: response.user.role,
        }),
        {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 1000 * 60 * 60 * 24,
        }
      );
      return res.status(200).json({
        role: response.user.role,
        message: STATUS_MESSAGES.AUTH.LOGIN_SUCCESS,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }

  async forgotPasswordController(
    req: Request<{}, {}, { email: string }>,
    res: Response
  ) {
    const { email } = req.body;

    try {
      await this._useCase.forgotPassword(email);
      return res.status(200).json({ message: "Email sent" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }

  async resetPasswordController(
    req: Request<{}, {}, { token: string; password: string }>,
    res: Response
  ) {
    const { token, password } = req.body;

    try {
      await this._useCase.resetPassword(token, password);
      return res.status(200).json({ message: "Password reset successfully" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }
  async logoutController(req: Request, res: Response) {
    try {
      res.clearCookie("currentUser", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(200).json({ message: "Logout successful" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }
}

export default UserAuthController;
