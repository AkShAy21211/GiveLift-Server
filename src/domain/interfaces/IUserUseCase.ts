import { User } from "../entities/User";

interface IUserUseCase{
    getUser(queryParams?: object): Promise<User[]>;
    create(user: User): Promise<User>;
    update(id: string, user: User): Promise<User>;
    getUserProfile(id: string): Promise<User|null>;
    deActivate(id: string): Promise<User>;
    restore(id: string): Promise<User>;
}


export default IUserUseCase