import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import DetailsPage from './components/DetailsPage/DetailsPage.jsx';
import SearchPage from './components/SearchPage/SearchPage.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import RegisterPage from './components/RegisterPage/RegisterPage.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.jsx';
import { urlConfig } from './config';

export default function App() {
  const [currentView, setView] = useState('main');
  const [gifts, setGifts] = useState([]);
  const [selectedGift, setSelectedGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Load user session if available
  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    const email = sessionStorage.getItem('email');
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    if (token && email) {
      setUser({ email, firstName, lastName, token });
    }
  }, []);

  // Fetch initial gifts list
  const fetchGifts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${urlConfig.backendUrl}/api/gifts`);
      const data = await res.json();
      setGifts(data);
    } catch (err) {
      console.error("Error fetching gifts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    setView('main');
  };

  const handleCommentAdded = (giftId, newComment) => {
    setGifts(prevGifts =>
      prevGifts.map(g => {
        if (g.id === giftId) {
          const comments = g.comments ? [...g.comments, newComment] : [newComment];
          return { ...g, comments };
        }
        return g;
      })
    );
    if (selectedGift && selectedGift.id === giftId) {
      setSelectedGift(prev => ({
        ...prev,
        comments: prev.comments ? [...prev.comments, newComment] : [newComment]
      }));
    }
  };

  return (
    <div className="app-layout">
      <Navbar
        currentView={currentView}
        setView={setView}
        user={user}
        onLogout={handleLogout}
      />

      {currentView === 'main' && (
        <MainPage
          gifts={gifts}
          onSelectGift={setSelectedGift}
          setView={setView}
          loading={loading}
        />
      )}

      {currentView === 'search' && (
        <SearchPage onSelectGift={setSelectedGift} />
      )}

      {currentView === 'profile' && user && (
        <ProfilePage
          user={user}
          onUpdateUser={(updated) => setUser(prev => ({ ...prev, ...updated }))}
          setView={setView}
        />
      )}

      {currentView === 'login' && (
        <LoginPage
          onLoginSuccess={(u) => setUser(u)}
          setView={setView}
        />
      )}

      {currentView === 'register' && (
        <RegisterPage
          onRegisterSuccess={(u) => setUser(u)}
          setView={setView}
        />
      )}

      {selectedGift && (
        <DetailsPage
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
          onCommentAdded={handleCommentAdded}
          user={user}
        />
      )}
    </div>
  );
}
