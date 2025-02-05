import { User } from "../entities/User.js";

interface IUserRepository {
  create(user: User): Promise<User | null>;
  findUserByEmailOrPhone(email: string, phone: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  findUserByIdAndUpdate(
    id: string,
    updateData: Partial<User>
  ): Promise<User | null>;
}

export default IUserRepository;
