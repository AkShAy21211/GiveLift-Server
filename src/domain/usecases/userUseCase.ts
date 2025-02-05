import { User } from "../../domain/entities/User.js";
import AppError from "../../infrastructure/utils/AppError.js";
import IUserRepository from "../interfaces/userRepository.interface.js";
import STATUS_CODES from '../../constants/statusCodes.js';
import STATUS_MESSAGES from "../../constants/statusMessages.js";

class UserUseCase   {
  constructor(private _userRepository: IUserRepository) {}
  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await this._userRepository.findUserById(id);

      if (!user) {
        throw new AppError(
          STATUS_MESSAGES.USER_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      throw new AppError(
        STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getUserByIdAndUpdate(
    id: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    try {
      const user = await this._userRepository.findUserById(id);
      if (!user) {
        throw new AppError(
          STATUS_MESSAGES.USER_NOT_FOUND,
          STATUS_CODES.NOT_FOUND
        );
      }
      const newUpdateUserFeilds = {
        name: updateData.name || user.name,
        email: updateData.email || user.email,
        phone: updateData.phone || user.phone,
        avatar: updateData.avatar || user.avatar,
        address: updateData.address || user.address,
        isVolunteer: updateData.isVolunteer,
      };

      const updatedUser = await this._userRepository.findUserByIdAndUpdate(
        id,
        newUpdateUserFeilds
      );
      if (!updatedUser) {
        throw new AppError(
          STATUS_MESSAGES.USER_UPDATE_FAILED,
          STATUS_CODES.INTERNAL_SERVER_ERROR
        );
      }
      return updatedUser;
    } catch (error) {
      throw new AppError(
        STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default UserUseCase;