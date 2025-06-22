import { User } from "../entities/User";

interface IUserAuthUseCase {
  register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }>;
  initializeStateCoordinator(
    name: string,
    email: string,
    password: string,
    phone: string,
    role: string,
    address: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    gender: string,
    dob: string
  ): Promise<boolean>;

  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, password: string): Promise<boolean>;
}

export default IUserAuthUseCase;
