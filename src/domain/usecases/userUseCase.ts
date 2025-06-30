import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import { User } from "../entities/User";
import IUserUseCase from "../interfaces/IUserUseCase";

class UserUseCase implements IUserUseCase {
  constructor(private _repository: IUserRepository) {}
  async getUserProfile(id: string): Promise<User | null> {
    try {
      return await this._repository.findById(id);
    } catch (error) {
      throw new Error("Error getting user profile");
    }
  }
  async getUser(queryParams?: any): Promise<User[]> {
    try {
      return await this._repository.find(queryParams);
    } catch (error) {
      throw new Error("Error getting user");
    }
  }
  async update(id: string, user: User): Promise<User> {
    try {
      return await this._repository.updateById(id, user);
    } catch (error) {
      throw new Error("Error updating user");
    }
  }
  async deActivate(id: string): Promise<User> {
    try {
      return await this._repository.updateById(id, {
        isDeleted: true,
        isActive: false,
      });
    } catch (error) {
      throw new Error("Error deleting user");
    }
  }
  async restore(id: string): Promise<User> {
    try {
      return await this._repository.updateById(id, {
        isDeleted: false,
        isActive: true,
      });
    } catch (error) {
      throw new Error("Error restoring user");
    }
  }
  async create(user: User): Promise<User> {
    try {
      const newUser = await this._repository.save(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
export default UserUseCase;
