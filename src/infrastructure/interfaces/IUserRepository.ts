import { User } from "../../domain/entities/User";

interface IUserRepository {
    
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findOne(filters: Record<string, any>): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    updateById(id: string, user: Partial<User>): Promise<User>;
    find({filters, sort, page, limit}: { filters?: Record<string,any>; sort?: any; page?: number; limit?: number }): Promise<User[]>;
}

export default  IUserRepository