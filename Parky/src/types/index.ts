export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface Platform {
  id: string;
  name: string;
  commission: number;
  website: string;
}

export interface Parking {
  id: string;
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
}

export interface Reservation {
  id: string;
  clientId: string;
  parkingId: string;
  platformId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  commission: number;
  totalAmount: number;
}