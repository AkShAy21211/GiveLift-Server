import IEmailService from "../../infrastructure/interfaces/IEmailService";
import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import BCrypt from "../../utils/bcrypt";
import JsonWebToken from "../../utils/jwt";
import { generateResetToken, hashToken } from "../../utils/token";
import { AppUser } from "../entities/User";
import IUserAuthUseCase from "../interfaces/IUserAuthUseCase";

class UserAuthUseCase implements IUserAuthUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _bvrypt: BCrypt,
    private _jwt: JsonWebToken,
    private _emailService: IEmailService
  ) {}
  async initializeStateCoordinator(
    name: string,
    email: string,
    phone: string,
    country: string,
    state: string,
    district: string,
    password: string,
    role: string
  ): Promise<boolean> {
    try {
      const user = await this._userRepository.findByEmail(email);
      if (user) {
        throw new Error("User already exists");
      }

      const hashedPassword = await this._bvrypt.hashPassword(password);

      const newUser = {
        name,
        email,
        phone,
        password: hashedPassword as string,
        address: {
          country,
          state,
          district,
        },
        role,
        isVolunteer: false,
      };

      const userToCreate = await this._userRepository.save(newUser as AppUser);
      if (userToCreate) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
  async register(
    name: string,
    email: string,
    phone: string,
    country: string,
    state: string,
    district: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      const user = await this._userRepository.findOne({
        email: email,
        phone: phone,
      });
      if (user) {
        throw new Error("User already exists");
      }

      // encrypt password
      const hashedPassword = await this._bvrypt.hashPassword(password);

      const newUser = {
        name,
        email,
        phone,
        password: hashedPassword as string,
        address: {
          country,
          state,
          district,
        },
        role,
        isVolunteer: false,
      };

      await this._userRepository.save(newUser as AppUser);
    } catch (error) {
      throw error;
    }
  }
  async login(
    email: string,
    password: string
  ): Promise<{ user: AppUser; token: string }> {
    try {
      const user = await this._userRepository.findByEmail(email);

      if (!user) {
        throw new Error("Email does not exist please register");
      }

      if (!user.password) {
        throw new Error("Please reset your password");
      }
      const hashPassword = await this._bvrypt.comparePassword(
        password,
        user.password
      );

      if (!hashPassword) {
        throw new Error("Invalid credentials");
      }

      const token = this._jwt.generateToken({
        _id: user?._id as any,
        email: user.email,
        role: user.role,
      });

      return { user, token };
    } catch (error) {
      throw error;
    }
  }
  async forgotPassword(email: string): Promise<void> {
    try {
      const user = await this._userRepository.findByEmail(email);

      if (!user) {
        throw new Error("User not found");
      }

      const { token, hash } = generateResetToken();
      await this._userRepository.updateById(user._id as any, {
        resetToken: hash,
        resetTokenExpires: new Date(Date.now() + 1000 * 60 * 15),
      });

      const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

      await this._emailService.sendEmail(
        [user.email],
        "Reset Password",
        resetLink
      );
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(token: string, password: string): Promise<boolean> {
    try {
      if (!token) {
        throw new Error("Invalid token");
      }

      const hashedToken = hashToken(token);
      const user = await this._userRepository.findOne({
        resetToken: hashedToken,
        resetTokenExpires: { $gt: Date.now() },
      });

      if (!user) {
        throw new Error("Token expired or invalid");
      }

      const hashedPassword = await this._bvrypt.hashPassword(password);

      // same password check using bcrypt
      const isSame = await this._bvrypt.comparePassword(
        password,
        user.password || ""
      );
      if (isSame) {
        throw new Error("New password cannot be the same as the old password");
      }

      await this._userRepository.updateById(user._id as any, {
        password: hashedPassword,
      });

      await this._userRepository.updateById(user._id as any, {
        resetToken: null,
        resetTokenExpires: null,
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
export default UserAuthUseCase;
