interface DisasterReport {
  title: string;
  description: string;
  type: string;
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: {
      type: [Number];
      required: false;
    };
    district: {
      type: String;
      required: false;
    };
    city: {
      type: String;
      required: false;
    };
    pinCode: {
      type: Number;
      required: false;
    };
  };
  reportedBy: any;
  byAdmin: boolean;
  resourcesNeeded: Array<{
    resourceType: string;
    quantity: number;
    cost: number;
  }>;
  severity: string;
  status: boolean;
  media: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default DisasterReport;
