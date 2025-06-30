import { User } from "../../domain/entities/User";
import { RepositoryError } from "../../shared/errors/RepositoryError";
import IUserRepository from "../interfaces/IUserRepository";
import { Model } from "mongoose";

class UserRepository implements IUserRepository {

  constructor(private readonly userModel: Model<User>) {}
 async findOne(filters: Record<string, any>): Promise<User | null> {
    try {
      return await this.userModel.findOne(filters).lean().exec();
    } catch (error) {
      throw new RepositoryError("Error finding user");
      
    }
  }
  async find({
    filters,
    sort,
    page,
    limit,
  }: {
    filters?: Record<string, any>;
    sort?: any;
    page?: number;
    limit?: number;
  }): Promise<User[]> {
    try {
      const query = {} as any;

      // Dynamically build filter query
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value === undefined) continue;

          query[key] = value;
        }
      }

      // Handle sort
      const sortOption = {} as any;
      if (sort) {
        const [field, order] = sort.split("_");
        sortOption[field] = order === "desc" ? -1 : 1;
      }
      let skip;
      if (page && limit) {
        skip = (page - 1) * limit;
      }


      return await this.userModel.find(query)
        .sort(sortOption)
        .skip(skip as number)
        .limit(limit as number);
    } catch (error: any) {
      throw new RepositoryError(error);
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    try {
      const data = await this.userModel.findOne({ email });
      return data ? data.toObject() : null;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      throw new RepositoryError(err.message);
    }
  }
  async save(user: User): Promise<User> {
    try {
      const data = new this.userModel(user);
      await data.save();
      return data.toObject();
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      throw new RepositoryError(err.message);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      
      const data = await this.userModel.findById(id);
      return data ? data.toObject() : null;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      throw new RepositoryError(err.message);
      
    }
  }

  async updateById(id: string, user: Partial<User>): Promise<User> {
    try {
      const data = await this.userModel.findByIdAndUpdate(id, user, { new: true });

      return data?.toObject() as User;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      throw new RepositoryError(err.message);
    }
  }
}

export default UserRepository;
