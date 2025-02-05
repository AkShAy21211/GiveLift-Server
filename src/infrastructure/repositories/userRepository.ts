import { User } from "../../entities/User.js";
import IUserRepository from "../../interfaces/repositories/userRepository.interface.js";
import UserModel from "../database/user.js";
import AppError from "../utils/AppError.js";
import Logger from "../utils/logger.js";

class UserRepository implements IUserRepository {
  constructor() {}
  async create(user: User): Promise<User | null> {
    try {
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();
      return savedUser.toObject();
    } catch (error) {
      Logger.error(`Error creating user: ${error}`);
      return null;
    }
  }
  async findUserByEmailOrPhone(
    email: string,
    phone: string
  ): Promise<User | null> {
    try {
      return await UserModel.findOne({ $or: [{ email }, { phone }] }).lean();
    } catch (error) {
      Logger.error(`Error finding user by email or phone: ${error}`);
      return null;
    }
  }
}

export default UserRepository;
