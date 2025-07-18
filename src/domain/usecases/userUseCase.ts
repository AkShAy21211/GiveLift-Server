import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import { AppUser } from "../entities/User";
import IUserUseCase from "../interfaces/IUserUseCase";

class UserUseCase implements IUserUseCase {
  constructor(private _repository: IUserRepository) {}
  getUser({
    filters,
    sort,
    page,
    limit,
  }: {
    filters?: Record<string, any>;
    sort?: any;
    page?: number;
    limit?: number;
  }): Promise<AppUser[]> {
    try {
      return this._repository.find({
        filters,
        sort,
        page,
        limit,
      });
    } catch (error) {
      throw new Error("Error getting AppUser");
    }
  }
  async getUserProfile(id: string): Promise<AppUser | null> {
    try {
      return await this._repository.findById(id);
    } catch (error) {
      throw new Error("Error getting AppUser profile");
    }
  }
  async getAppUser(queryParams?: any): Promise<AppUser[]> {
    try {
      return await this._repository.find(queryParams);
    } catch (error) {
      throw new Error("Error getting AppUser");
    }
  }
  async update(id: string, AppUser: AppUser): Promise<AppUser> {
    try {
      return await this._repository.updateById(id, AppUser);
    } catch (error) {
      throw new Error("Error updating AppUser");
    }
  }
  async deActivate(id: string): Promise<AppUser> {
    try {
      return await this._repository.updateById(id, {
        isDeleted: true,
        isActive: false,
      });
    } catch (error) {
      throw new Error("Error deleting AppUser");
    }
  }
  async restore(id: string): Promise<AppUser> {
    try {
      return await this._repository.updateById(id, {
        isDeleted: false,
        isActive: true,
      });
    } catch (error) {
      throw new Error("Error restoring AppUser");
    }
  }
  async create(user: AppUser): Promise<AppUser> {
    try {
      const newUser = await this._repository.save({
        ...user,
        password: "",
      });
      return newUser;
    } catch (error) {
      throw new Error("Error creating AppUser");
    }
  }
}
export default UserUseCase;
