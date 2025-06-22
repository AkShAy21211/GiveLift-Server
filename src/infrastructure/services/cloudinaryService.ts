import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import ICloudinaryService from "../interfaces/cloudnaryService.interface.js";
import ENVS from "../../config/envConfig.js";

// Cloudinary Service Class
class CloudinaryService implements ICloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: ENVS.CLOUDNAME,
      api_key: ENVS.CLOUD_API,
      api_secret: ENVS.CLOUD_API_SECRET,
    });
  }

  // Upload Function
  async uploadFile(
    file: Express.Multer.File,
    folder: string
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `DMS/${folder}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        )
        .end(file.buffer);
    });
  }
}

// Export as Singleton
export default CloudinaryService;
