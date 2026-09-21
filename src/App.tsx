/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicView from './pages/PublicView';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect, useState } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/admin" element={user ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/admin" /> : <AdminLogin />} />
      </Routes>
    </Router>
  );
}

