interface DisasterReportDto {
  title: string;
  description: string;
  type: string;
  location: {
    coordinates: number[];
    district: string;
    city: string;
    pincode: number;
  };
  reportedBy: any;
  severity: string;
  peopleEffected:number;
  status: boolean;
  media: string[];

}
export default DisasterReportDto