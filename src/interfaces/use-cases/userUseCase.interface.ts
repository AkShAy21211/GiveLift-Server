import { User } from "../../entities/User.js";
import JsonResponse from "../../types/response.js";

interface IUserUseCase {
  createAndSaveUser(user: User): Promise<{user:User,token:string}>;
  authenticateUser(email:string,password:string):Promise<{user:User,token:string}>;
  fetchUserByEmailOrPhone(email: string,phone:string): Promise<User|null|undefined>;
}

export default IUserUseCase;
