import { UploadApiResponse } from "cloudinary";

// Define an interface for CloudinaryService
interface ICloudinaryService {
  uploadFile(file: Express.Multer.File, folder: string): Promise<UploadApiResponse>;
}

export default ICloudinaryService