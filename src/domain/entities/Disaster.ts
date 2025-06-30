import { Types } from "mongoose";

export interface DisasterReport {
    place: string;
    disasterType?: string;
    country?: string;
    state?: string;
    district?: string;
    status: string;
    severityLevel?: string;
    peopleAffected: number;
    reportedBy: Types.ObjectId;
    situationDescription: string;
    resourcesNeeded: string[];
  }
  