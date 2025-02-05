import { User } from "../../domain/entities/User.js";
import IUserRepository from "../../domain/interfaces/userRepository.interface.js";
import UserModel from "../models/user.js";
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
  async findUserById(id: string): Promise<User | null> {
    try {
      return await UserModel.findById(id).lean();
    } catch (error) {
      Logger.error(`Error finding user by id: ${id}: ${error}`);
      return null;
    }
  }

  async findUserByIdAndUpdate(
    id: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    try {
      return await UserModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      ).lean();
    } catch (error) {
      Logger.error(`Error updating user with id: ${id}: ${error}`);
      return null;
    }
  }
}

export default UserRepository;
