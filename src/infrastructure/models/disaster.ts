import { Schema, model } from "mongoose";


// Create the Mongoose schema corresponding to the DisasterReport interface
const disasterReportSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  location: {
    coord: { type: [Number], required: false },  
    district: { type: String, required: false },
    city: { type: String, required: false },
    pinCode: { type: Number, required: false },
  },
  reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  byAdmin: { type: Boolean, required: true },
  resourcesNeeded: [
    {
      resourceType: { type: String, required: true },
      quantity: { type: Number, required: true },
      cost: { type: Number, required: true },
    },
  ],
  severity: { type: String, required: true },
  status: { type: Boolean, required: true },
  media: { type: [String], required: true }, 
}, { timestamps: true }); 

//create index
disasterReportSchema.index({ location: '2dsphere' });



// Create the Mongoose model
const DisasterReportModel = model('DisasterReport', disasterReportSchema);

export default DisasterReportModel;
