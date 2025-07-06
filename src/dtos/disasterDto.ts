export interface CreateDisasterReportDto {
  place: string;
  country: string;
  state: string;
  district: string;
  disasterType:string;
  severityLevel: "low" | "moderate" | "high" | "critical" | "catastrophic";
  peopleAffected: number;
  situationDescription: string;
  resourcesNeeded: string[];
}
export interface UpdateDisasterReportDto {
  place?: string;
  country?: string;
  state?: string;
  district?: string;
  disasterType?:string;
  severityLevel?: "low" | "moderate" | "high" | "critical" | "catastrophic";
  peopleAffected?: number;
  situationDescription?: string;
  resourcesNeeded?: string[];
}
