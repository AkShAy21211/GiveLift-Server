import { District } from "../../domain/entities/District";

interface IDistrictRepository {
  find({
    filters,
    projection,
  }: {
    filters?: Record<string, any>;
    projection?: Record<string, 1>;
  }): Promise<District[]>
}

export default IDistrictRepository;
