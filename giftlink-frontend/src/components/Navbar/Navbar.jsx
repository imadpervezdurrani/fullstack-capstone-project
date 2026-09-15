import React from 'react';

export default function Navbar({ currentView, setView, user, onLogout }) {
  return (
    <nav className="navbar" id="app-navbar">
      <div className="brand-logo" onClick={() => setView('main')}>
        <div className="brand-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 2a3 3 0 0 0-3 3v1H4a2 2 0 0 0-2 2v2h20V8a2 2 0 0 0-2-2h-5V5a3 3 0 0 0-3-3zm-1 4V5a1 1 0 1 1 2 0v1h-2zM2 12v8a2 2 0 0 0 2 2h7v-10H2zm11 10h7a2 2 0 0 0 2-2v-8h-9v10z" />
          </svg>
        </div>
        <span>GiftLink</span>
      </div>

      <div className="nav-links">
        <button
          className={`nav-btn ${currentView === 'main' ? 'active' : ''}`}
          onClick={() => setView('main')}
          id="nav-home-btn"
        >
          Gifts
        </button>

        <button
          className={`nav-btn ${currentView === 'search' ? 'active' : ''}`}
          onClick={() => setView('search')}
          id="nav-search-btn"
        >
          🔍 Search
        </button>

        {user ? (
          <>
            <div
              className="user-badge"
              style={{ cursor: 'pointer' }}
              onClick={() => setView('profile')}
              title="Click to view profile"
              id="nav-profile-badge"
            >
              👤 {user.firstName || user.email}
            </div>
            <button
              className="nav-btn"
              onClick={onLogout}
              id="nav-logout-btn"
              style={{ color: '#ef4444' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="nav-btn"
              onClick={() => setView('login')}
              id="nav-login-btn"
            >
              Login
            </button>
            <button
              className="nav-btn nav-btn-primary"
              onClick={() => setView('register')}
              id="nav-register-btn"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
