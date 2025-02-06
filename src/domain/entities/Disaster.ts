interface DisasterReport {
  title: string;
  description: string;
  type: string;
  location: {
    type: 'Point'; 
    coordinates: number[];
    district: string;
    city: string;
    pinCode: number;
  };
  reportedBy: any;
  severity: string;
  status: boolean;
  media: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default DisasterReport;
