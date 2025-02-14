import STATUS_CODES from "../../constants/statusCodes.js";
import STATUS_MESSAGES from "../../constants/statusMessages.js";
import ENVS from "../../infrastructure/config/envConfig.js";
import AppError from "../../infrastructure/utils/AppError.js";
import BCrypt from "../../infrastructure/utils/bcrypt.js";
import JsonWebToken from "../../infrastructure/utils/jwt.js";
import { User } from "../entities/User.js";
import IUserRepository from "../interfaces/userRepository.interface.js";

class AdminAuthUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _bcrypt: BCrypt,
    private _jsonWebToken:JsonWebToken
  ) {}

  async createAdmin(): Promise<User | null> {
    try {
      const existingAdmin = await this._userRepository.findUserByEmailOrPhone(
        ENVS.ADMIN_EMAIL as string,
        ENVS.ADMIN_PHONE as string
      );

      if (!existingAdmin) {
        const adminData = {
          name: "Admin",
          email: ENVS.ADMIN_EMAIL,
          phone: ENVS.ADMIN_PHONE,
          avatar: "",
          password: await this._bcrypt.hashPassword(
            ENVS.ADMIN_PASSWORD as string
          ),
          role: "admin",
        };
        const admin = await this._userRepository.create(adminData as any);

        return admin;
      }

      return existingAdmin;
    } catch (error: any) {
      throw new AppError(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    try {
      const existingUser = await this._userRepository.findUserByEmailOrPhone(
        email,
        ""
      );

      if (!existingUser) {
        throw new AppError(
          STATUS_MESSAGES.USER_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }
      const isValidPassword = this._bcrypt.comparePassword(
        password,
        existingUser?.password as string
      );

      if (!isValidPassword) {
        throw new AppError(
          STATUS_MESSAGES.INVALID_CREDENTIALS,
          STATUS_CODES.BAD_REQUEST
        );
      }

      return {
        user: existingUser,
        token: this._jsonWebToken.generateToken({
          _id: existingUser._id as string,
          email: existingUser.email,
          role: existingUser.role,
        }),
      };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }


}

export default AdminAuthUseCase;