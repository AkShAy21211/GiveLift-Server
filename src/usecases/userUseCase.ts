import { User } from "../entities/User.js";
import BCrypt from "../infrastructure/utils/bcrypt.js";
import IUserRepository from "../interfaces/repositories/userRepository.interface.js";
import IUserUseCase from "../interfaces/use-cases/userUseCase.interface.js";
import AppError from "../infrastructure/utils/AppError.js";
import { STATUS_CODES, USER_MESSAGES } from "../constants/statusCodes.js";
import Logger from "../infrastructure/utils/logger.js";
import JsonWebToken from "../infrastructure/utils/jwt.js";

class UserUseCase implements IUserUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _bcrypt: BCrypt,
    private jsonWebToken: JsonWebToken
  ) {}
  async createAndSaveUser(user: User): Promise<{ user: User; token: string }> {
    try {
      const existingUser = await this._userRepository.findUserByEmailOrPhone(
        user.email,
        user.phone
      );
      if (existingUser) {
        throw new AppError(
          USER_MESSAGES.USER_ALREADY_EXISTS,
          STATUS_CODES.CONFLICT
        );
      }

      const hashedPassword = await this._bcrypt.hashPassword(user.password);
      user.password = hashedPassword as string;
      const savedUser = await this._userRepository.create(user);
      return {
        user: savedUser,
        token: this.jsonWebToken.generateToken({
          _id: user._id as string,
          email: user.email,
          role: user.role,
        }),
      };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
  async authenticateUser(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    console.log(email, password);

    try {
      const existingUser = await this._userRepository.findUserByEmailOrPhone(
        email,
        ""
      );

      if (!existingUser) {
        throw new AppError(
          USER_MESSAGES.USER_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }
      const isValidPassword = this._bcrypt.comparePassword(
        password,
        existingUser?.password as string
      );

      if (!isValidPassword) {
        throw new AppError(
          USER_MESSAGES.INVALID_CREDENTIALS,
          STATUS_CODES.UNAUTHORIZED
        );
      }

      return {
        user: existingUser,
        token: this.jsonWebToken.generateToken({
          _id: existingUser._id as string,
          email: existingUser.email,
          role: existingUser.role,
        }),
      };
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  async fetchUserByEmailOrPhone(
    email: string,
    phone: string
  ): Promise<User | null | undefined> {
    try {
      const user = await this._userRepository.findUserByEmailOrPhone(
        email,
        phone
      );

      if (!user) {
        return null;
      }

      return user;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

export default UserUseCase;
