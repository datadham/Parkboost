import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig"; // Import Firebase auth
import Layout from "./components/Layout";
import Analytics from "./pages/Analytics";
import Clients from "./pages/Clients";
import AddClient from "./pages/AddClient";
import ClientDetail from "./pages/ClientDetail";
import Reservations from "./pages/Reservations";
import Platforms from "./pages/Platforms";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if a user is logged in, otherwise false
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show loading screen while checking authentication status
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          // Protected routes when authenticated
          <Route element={<Layout />}>
            <Route path="/" element={<Analytics />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/add-client" element={<AddClient />} />
            <Route path="/client/:id" element={<ClientDetail />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/platforms" element={<Platforms />} />
          </Route>
        ) : (
          // Login route when not authenticated
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
