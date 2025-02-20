interface DisasterReport {
  title: string;
  description: string;
  type: string;
  location: {
    coordinates: number[];
    district: string;
    city: string;
    pincode: number;
  };
  reportedBy?: string;
  byAdmin?:boolean;
  severity: string;
  status: boolean;
  media: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default DisasterReport;
