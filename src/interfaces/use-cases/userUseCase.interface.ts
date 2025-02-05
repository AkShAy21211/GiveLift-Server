import { User } from "../../entities/User.js";

interface IUserUseCase{

    getUserById(id: string): Promise<User|null>;
    getUserByIdAndUpdate(id:string,updateData:Partial<User>): Promise<User|null>

}

export default IUserUseCase;