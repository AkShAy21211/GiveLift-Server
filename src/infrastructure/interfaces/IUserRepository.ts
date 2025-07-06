import { AppUser  } from "../../domain/entities/User";

interface IUserRepository {
    
    save(user: AppUser): Promise<AppUser>;
    findById(id: string): Promise<AppUser | null>;
    findOne(filters: Record<string, any>): Promise<AppUser | null>;
    findByEmail(email: string): Promise<AppUser | null>;
    updateById(id: string, user: Partial<AppUser>): Promise<AppUser>;
    find({filters, sort, page, limit}: { filters?: Record<string,any>; sort?: any; page?: number; limit?: number }): Promise<AppUser[]|[]>;
}

export default  IUserRepository