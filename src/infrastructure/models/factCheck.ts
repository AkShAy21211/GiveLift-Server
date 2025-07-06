import mongoose, { Schema } from "mongoose";
import { FactCheck, TargetAudience } from "../../domain/entities/FactCheck";

  const targetAudienceSchema = new Schema<TargetAudience>({
    region: String,
    ageGroup: String,
    groups: [String],
  }, { _id: false });
  
  const factCheckSchema = new Schema<FactCheck>(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      publishedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      type: {
        type: String,
        enum: ["confirmation", "debunking", "clarification"],
        required: true,
      },
      relatedRumors: [{
        type: Schema.Types.ObjectId,
        ref: "Rumor",
      }],
      targetAudience: targetAudienceSchema,
      officialSourceLink: {
        type: String,
      },
      status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const FactCheckModel = mongoose.model<FactCheck>("FactCheck", factCheckSchema);
  export default FactCheckModel;
  