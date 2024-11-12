import React, { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Platform } from '../types';
import type { ColumnDef } from '@tanstack/react-table';

const mockPlatforms: Platform[] = [
  {
    id: '1',
    name: 'ParkingPal',
    commission: 15,
    website: 'https://parkingpal.example.com',
  },
  // Add more mock data as needed
];

export default function Platforms() {
  const [platforms] = useState<Platform[]>(mockPlatforms);

  const columns: ColumnDef<Platform, any>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Commission',
      accessorKey: 'commission',
      cell: ({ getValue }) => `${getValue()}%`,
    },
    {
      header: 'Website',
      accessorKey: 'website',
      cell: ({ getValue }) => (
        <a
          href={getValue() as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          {getValue() as string}
        </a>
      ),
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex gap-2">
          <button className="p-1 text-blue-600 hover:text-blue-800">
            <Pencil className="w-4 h-4" />
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
          <h1 className="text-2xl font-bold text-gray-900">Platforms</h1>
          <p className="mt-1 text-gray-600">Manage booking platforms and commissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Platform
        </button>
      </div>

      <DataTable data={platforms} columns={columns} />
    </div>
  );
}