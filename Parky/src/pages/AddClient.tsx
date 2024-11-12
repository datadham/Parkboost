// src/pages/AddClient.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import type { Client } from '../types';


export default function AddClient() {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client>({
    name: '',
    email: '',
    phone: '',
    address: '',
    createdAt: new Date(),
  });

  // Handle input changes with type annotations
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  // Handle form submission with async function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add the client to Firestore
      await addDoc(collection(db, "clients"), client);
      alert("Client added successfully!");
      navigate('/'); // Redirect to clients list page after adding
    } catch (error) {
      console.error("Error adding client: ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address:</label>
          <input
            type="text"
            name="address"
            value={client.address}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full">
          Add Client
        </button>
      </form>
    </div>
  );
}
