import { AppUser } from "../../domain/entities/User";
import { RepositoryError } from "../../shared/errors/RepositoryError";
import IUserRepository from "../interfaces/IUserRepository";
import { FilterQuery, Model, Types } from "mongoose";

interface FindOptions {
  filters?: FilterQuery<AppUser>;
  sort?: string;
  page?: number;
  limit?: number;
}

class UserRepository implements IUserRepository {
  constructor(private readonly userModel: Model<AppUser>) {}
  async findOne(filters: FilterQuery<AppUser>): Promise<AppUser | null> {
    try {
      const user = await this.userModel.findOne(filters).lean().exec();
      return user as AppUser;
    } catch (error: any) {
      const errMsg = error instanceof Error ? error.message : String(error);
      throw new RepositoryError(
        `Failed to find user. Filters: ${JSON.stringify(filters)}. Error: ${errMsg}`
      );
    }
  }
  async find({
    filters = {},
    sort,
    page = 1,
    limit = 10,
  }: FindOptions): Promise<AppUser[] | []> {
    try {
      const query: FilterQuery<AppUser> = {};

      // Apply filters
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined) {
          query[key] = value;
        }
      }

      // Sort processing
      const sortOption: Record<string, 1 | -1> = {};
      if (sort) {
        const [field, order] = sort.split("_");
        sortOption[field] = order === "desc" ? -1 : 1;
      }

      const skip = (page - 1) * limit;

      const users = await this.userModel
        .find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
      return users as AppUser[];
    } catch (error: any) {
      const errMsg = error instanceof Error ? error.message : String(error);
      throw new RepositoryError(`Error in find(): ${errMsg}`);
    }
  }
  async findByEmail(email: string): Promise<AppUser | null> {
    try {
      const data = await this.userModel.findOne({ email });
      return data ? data.toObject() : null;
    } catch (error) {
      throw new RepositoryError("Error in findByEmail");
    }
  }
  async save(user: AppUser): Promise<AppUser> {
    try {
      const data = new this.userModel(user);
      await data.save();
      return data.toObject();
    } catch (error: unknown) {
      throw new RepositoryError("Error in save");
    }
  }

  async findById(id: string): Promise<AppUser | null> {
    try {
      const objectId = new Types.ObjectId(id);
      const data = await this.userModel.findById(objectId);
      return data ? data.toObject() : null;
    } catch (error) {
      throw new RepositoryError("Error in findById");
    }
  }

  async updateById(id: string, user: Partial<AppUser>): Promise<AppUser> {
    try {
      const objectId = new Types.ObjectId(id);
      const data = await this.userModel.findByIdAndUpdate(objectId, user, {
        new: true,
      });

      if (!data) {
        throw new RepositoryError("User not found");
      }

      return data.toObject();
    } catch (error) {
      throw new RepositoryError("Error in updateById");
    }
  }
}

export default UserRepository;
