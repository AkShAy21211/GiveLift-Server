import { AppUser } from "../entities/User";

interface IUserAuthUseCase {
  register(
    name: string,
    email: string,
    phone: string,
    country: string,
    state: string,
    district: string,
    password: string,
    role: string
  ): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{ user: AppUser; token: string }>;
  initializeStateCoordinator(
    name: string,
    email: string,
    phone: string,
    country: string,
    state: string,
    district: string,
    password: string,
    role: string
  ): Promise<boolean>;

  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, password: string): Promise<boolean>;
}

export default IUserAuthUseCase;
