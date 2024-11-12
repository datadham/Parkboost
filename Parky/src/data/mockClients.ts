// src/data/mockClients.ts
import type { Client } from '../types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, City',
    createdAt: new Date('2024-01-15'),
  },
  // Add more mock data as needed
];