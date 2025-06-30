
export interface Donation extends Document {
    resourceType: string;
    quantity: number;
    address: string;
    note?: string;
    donatedBy: string;
    country?: string;
    state?: string;
    district?: string;
    status: 'pending' | 'assigned' | 'completed';
    createdAt?: Date;
    updatedAt?: Date;
  }

export default Donation;