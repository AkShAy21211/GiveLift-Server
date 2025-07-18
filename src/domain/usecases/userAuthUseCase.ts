import IEmailService from "../../infrastructure/interfaces/IEmailService";
import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import { RepositoryError } from "../../shared/errors/RepositoryError";
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
      if (error instanceof RepositoryError) {
        throw new Error("Error initializing state coordinator");
      }
      throw error;
    }
  }
  async register(
    name: string,
    email: string,
    phone: string,
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
          district,
        },
        role,
        isVolunteer: false,
      };

      await this._userRepository.save(newUser as AppUser);
    } catch (error) {
      console.error("Error registering user: ", error);
      if(error instanceof RepositoryError){
        throw new Error("Registration failed");
      }
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
      console.error("Error logging in user: ", error);
      if (error instanceof RepositoryError) {
        throw new Error("Login failed");
      }
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

      const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <h2>Password Reset Request</h2>
        <p>Hello ${user.name || "User"},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${resetLink}" 
           style="display: inline-block; margin: 16px 0; padding: 12px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
        <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p><strong>Note:</strong> This link will expire in 15 minutes for your security.</p>
        <p>If you didn't request a password reset, you can ignore this email.</p>
        <br/>
        <p>Thanks,<br/>The Support Team</p>
      </div>
    `;

      await this._emailService.sendEmail(
        [user.email],
        "Reset Your Password",
        htmlContent
      );
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw new Error("Error while sending reset password email");
      }
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
      if (error instanceof RepositoryError) {
        throw new Error("Error reset password");
      }
      throw error;
    }
  }
}
export default UserAuthUseCase;
