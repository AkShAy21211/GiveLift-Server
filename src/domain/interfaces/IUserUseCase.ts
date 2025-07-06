import { AppUser } from "../entities/User";

interface IUserUseCase{
    getUser({filters, sort, page, limit}: { filters?: Record<string,any>; sort?: any; page?: number; limit?: number }): Promise<AppUser[]>;
    create(user: AppUser): Promise<AppUser>;
    update(id: string, user: Partial<AppUser>): Promise<AppUser>;
    getUserProfile(id: string): Promise<AppUser|null>;
    deActivate(id: string): Promise<AppUser>;
    restore(id: string): Promise<AppUser>;
}


export default IUserUseCase