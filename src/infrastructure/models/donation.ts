import mongoose, { Schema} from "mongoose";
import { Donation, ResourceDetails } from "../../domain/entities/Donation";


const resourceDetailsSchema = new Schema<ResourceDetails>({
  resourceType: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
}, { _id: false });

const donationSchema = new Schema<Donation>(
  {
    donatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donationType: {
      type: String,
      enum: ["monetary", "resource"],
      required: true,
    },
    resourceDetails: {
      type: resourceDetailsSchema,
      required: function () {
        return this.donationType === "resource";
      },
    },
    monetaryAmount: {
      type: Number,
      required: function () {
        return this.donationType === "monetary";
      },
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "fulfilled"],
      default: "pending",
      required: true,
    },
    assignedToDisaster: {
      type: Schema.Types.ObjectId,
      ref: "Disaster",
    },
  },
  {
    timestamps: true,
  }
);


donationSchema.index({ donatedBy: 1 });
donationSchema.index({ donationType: 1, status: 1 });

const DonationModel = mongoose.model<Donation>("Donation", donationSchema);
export default DonationModel;
