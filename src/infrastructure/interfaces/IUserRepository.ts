import { User } from "../../domain/entities/User";

interface IUserRepository {
    
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    updateById(id: string, user: Partial<User>): Promise<User | null>;
    find(filter: Record<string, any>): Promise<User | null>;
}

export default  IUserRepository