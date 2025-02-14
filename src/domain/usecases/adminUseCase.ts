import { User } from "../entities/User.js";
import IUserRepository from "../interfaces/userRepository.interface.js";
import AppError from "../../infrastructure/utils/AppError.js";
import STATUS_MESSAGES from "../../constants/statusMessages.js";
import STATUS_CODES from "../../constants/statusCodes.js";
import BCrypt from "../../infrastructure/utils/bcrypt.js";
import { log } from "winston";

class AdminUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _bcrypt: BCrypt
  ) {}

  async createCordinator(cordinatorData: User): Promise<User> {
    try {
      const existingUser = await this._userRepository.findUserByEmailOrPhone(
        cordinatorData.email,
        cordinatorData.phone
      );
      if (existingUser) {
        throw new AppError(
          STATUS_MESSAGES.USER_ALREADY_EXISTS,
          STATUS_CODES.CONFLICT
        );
      }

      const hashedPassword = await this._bcrypt.hashPassword(
        cordinatorData.password
      );
      cordinatorData.password = hashedPassword as string;
      const newCordinator = await this._userRepository.create(cordinatorData);

      if (!newCordinator) {
        throw new AppError(
          STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
          STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }

      return newCordinator;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async getCoordinators(limit:number,skip:number): Promise<{coordinators:User[],totalCoordinators:number} | null> {
    try {
      const data = await this._userRepository.findCoordinators(limit,skip);
      
      if (!data) {
        throw new AppError(
          STATUS_MESSAGES.SOMETHING_WENT_WRONG,
          STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }
      return data;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export default AdminUseCase;
