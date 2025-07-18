
export interface CreateDisasterReportDto {
  address: string;
  districtId: string;
  disasterType:string;
  severity: "low" | "moderate" | "high" | "critical" | "catastrophic";
  description: string;
  resourcesNeeded: string[];
}
export interface UpdateDisasterReportDto {
  address?: string;
  district?: string;
  disasterType?:string;
  severityLevel?: "low" | "moderate" | "high" | "critical" | "catastrophic";
  situationDescription?: string;
  resourcesNeeded?: string[];
}
