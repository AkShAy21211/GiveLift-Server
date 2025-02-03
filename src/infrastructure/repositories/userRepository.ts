import { User } from "../../entities/User.js";
import IUserRepository from "../../interfaces/repositories/userRepository.interface.js";
import UserModel from "../database/user.js";
import Logger from "../utils/logger.js";

class UserRepository implements IUserRepository {
  constructor() {}
  async create(user: User): Promise<User> {
    try {
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();
      return savedUser.toObject();
    } catch (error) {
      Logger.error(`Error creating user: ${error}`);
      throw new Error("Failed to create user.");
    }
  }
  async findUserByEmailOrPhone(email: string, phone: string): Promise<User|null> {
    
    return await UserModel.findOne({ $or: [{ email }, { phone }] }).lean();
  }
}

export default UserRepository;
