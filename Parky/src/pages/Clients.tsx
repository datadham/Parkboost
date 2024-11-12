import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Client } from '../types';
import { db } from '../firebase/firebaseConfig'; // Import Firestore configuration
import { collection, getDocs, Timestamp } from 'firebase/firestore'; // Import Firestore methods
import type { ColumnDef } from '@tanstack/react-table';

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const navigate = useNavigate();

  // Fetch clients from Firestore on component mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const clientsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Include the document ID if needed
            ...data,
            createdAt: data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : data.createdAt, // Convert Timestamp to Date if needed
          };
        }) as Client[];
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    };

    fetchClients();
  }, []);

  const columns: ColumnDef<Client, any>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: ({ getValue }) => {
        const date = getValue() as Date;
        return date ? date.toLocaleDateString() : ''; // Format date if it exists
      },
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="p-1 text-blue-600 hover:text-blue-800"
            onClick={() => navigate(`/client/${row.original.id}`)}
          >
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
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="mt-1 text-gray-600">Manage your client database</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate('/add-client')}
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <DataTable data={clients} columns={columns} />
    </div>
  );
}
