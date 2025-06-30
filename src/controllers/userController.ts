import { Request, Response } from "express-serve-static-core";
import IUserUseCase from "../domain/interfaces/IUserUseCase";

class UserController {
  constructor(private _userUseCase: IUserUseCase) {}

  async getUserController(req: Request, res: Response) {
    const queryParams = {
      filters: req.query,
      sort: req.query.sort,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };

    delete queryParams.filters.sort;
    delete queryParams.filters.page;
    delete queryParams.filters.limit;

    try {
      const user = await this._userUseCase.getUser(queryParams);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
  async createUserController(req: Request, res: Response) {
    const user = req.body;

    try {
      await this._userUseCase.create(user);
      return res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }

  async updateUserController(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body;
    try {
      await this._userUseCase.update(id, user);
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }

  async deActivateUserController(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this._userUseCase.deActivate(id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }

  async restoreUserController(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this._userUseCase.restore(id);
      return res.status(200).json({ message: "User restored successfully" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }

  async getUserProfileController(req: Request, res: Response) {
    const cookie = req.cookies.currentUser;
    const currentUser = cookie ? JSON.parse(cookie) : null;
    const id = currentUser?._id;
    
    try {
      const user = await this._userUseCase.getUserProfile(id);      
      return res.status(200).json(user);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error?.message || "Something went wrong" });
    }
  }
}

export default UserController;
