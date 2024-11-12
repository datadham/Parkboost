import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Client } from '../types';
import { mockClients } from '../data/mockClients';

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the client based on the ID
  const clientData = mockClients.find((client) => client.id === id);

  // Redirect if client not found
  if (!clientData) {
    return <p>Client not found</p>;
  }

  // State for editable client data
  const [client, setClient] = useState<Client>({ ...clientData });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  // Handle save changes and navigate back to clients page
  const handleSave = () => {
    // Update client data in mockClients (for demonstration only)
    const index = mockClients.findIndex((c) => c.id === client.id);
    if (index !== -1) {
      mockClients[index] = client; // Note: this won't persist in a real app
    }
    setIsEditing(false);
    navigate('/'); // Redirect to the clients page after saving
  };

  // Handle delete client
  const handleDelete = () => {
    const index = mockClients.findIndex((c) => c.id === client.id);
    if (index !== -1) {
      mockClients.splice(index, 1); // Remove client from the array
    }
    navigate('/'); // Redirect to the client list after deletion
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{isEditing ? 'Edit Client' : client.name}</h1>
      {isEditing ? (
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={client.name}
              onChange={handleInputChange}
              className="border p-1"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={client.email}
              onChange={handleInputChange}
              className="border p-1"
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={client.phone}
              onChange={handleInputChange}
              className="border p-1"
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={client.address}
              onChange={handleInputChange}
              className="border p-1"
            />
          </label>
        </div>
      ) : (
        <div>
          <p>Email: {client.email}</p>
          <p>Phone: {client.phone}</p>
          <p>Address: {client.address}</p>
          <p>Created At: {client.createdAt.toLocaleDateString()}</p>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {isEditing ? (
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded">
            Edit
          </button>
        )}
        <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
          Delete
        </button>
        {isEditing && (
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}