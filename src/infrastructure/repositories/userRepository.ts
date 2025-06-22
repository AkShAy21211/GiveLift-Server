import { User } from "../../domain/entities/User";
import UserModel from "../models/user";
import { RepositoryError } from "../../shared/errors/RepositoryError";
import IUserRepository from "../interfaces/IUserRepository";

class UserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<User | null> {
    try {
      const data = await UserModel.findOne({ email });
      return data ? data.toObject() : null;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      throw new RepositoryError(err.message);
    }
  }
  async save(user: User): Promise<User> {
    try {
      const data = new UserModel(user);
      await data.save();
      return data.toObject();
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      throw new RepositoryError(err.message);
    }
  }

  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async updateById(id: string, user: Partial<User>): Promise<User | null> {
    
    try {
      const data = await UserModel.findByIdAndUpdate(id, user, { new: true });
      
      return data ? data.toObject() : null;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      throw new RepositoryError(err.message);
    }
  }

  async find(filter: Record<string, any>): Promise<User | null> {
    try {
      
      const data = await UserModel.findOne(filter);      
      return data ? data.toObject() : null;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      throw new RepositoryError(err.message);
    }
  }
}

export default UserRepository;
