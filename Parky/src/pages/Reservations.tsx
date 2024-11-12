import React, { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Plus, Eye, Trash2 } from 'lucide-react';
import type { Reservation } from '../types';
import type { ColumnDef } from '@tanstack/react-table';

const mockReservations: Reservation[] = [
  {
    id: '1',
    clientId: '1',
    parkingId: '1',
    platformId: '1',
    startTime: new Date('2024-03-10T10:00:00'),
    endTime: new Date('2024-03-10T18:00:00'),
    status: 'confirmed',
    commission: 15,
    totalAmount: 45.00,
  },
  // Add more mock data as needed
];

export default function Reservations() {
  const [reservations] = useState<Reservation[]>(mockReservations);

  const columns: ColumnDef<Reservation, any>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Start Time',
      accessorKey: 'startTime',
      cell: ({ getValue }) => {
        const date = getValue() as Date;
        return date.toLocaleString();
      },
    },
    {
      header: 'End Time',
      accessorKey: 'endTime',
      cell: ({ getValue }) => {
        const date = getValue() as Date;
        return date.toLocaleString();
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const colors = {
          confirmed: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          cancelled: 'bg-red-100 text-red-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      header: 'Commission',
      accessorKey: 'commission',
      cell: ({ getValue }) => `${getValue()}%`,
    },
    {
      header: 'Total Amount',
      accessorKey: 'totalAmount',
      cell: ({ getValue }) => `€${getValue().toFixed(2)}`,
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex gap-2">
          <button className="p-1 text-blue-600 hover:text-blue-800">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1 text-red-600 hover:text-red-800">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="mt-1 text-gray-600">Manage parking reservations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Reservation
        </button>
      </div>

      <DataTable data={reservations} columns={columns} />
    </div>
  );
}