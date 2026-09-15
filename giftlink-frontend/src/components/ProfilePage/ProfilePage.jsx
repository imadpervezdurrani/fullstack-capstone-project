import React, { useState } from 'react';
import { urlConfig } from '../../config';

export default function ProfilePage({ user, onUpdateUser, setView }) {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('auth-token') || ''}`
        },
        body: JSON.stringify({
          email: user.email,
          firstName,
          lastName
        })
      });

      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('lastName', lastName);
        onUpdateUser({ firstName, lastName });
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gifts-container" style={{ maxWidth: '600px', paddingTop: '3rem' }}>
      <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#fff' }}>
          User Profile
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Manage your account credentials and personal details
        </p>

        {message && (
          <div style={{
            padding: '0.85rem',
            background: message.includes('success') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${message.includes('success') ? 'var(--border-active)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: 'var(--radius-sm)',
            color: message.includes('success') ? 'var(--primary)' : '#f87171',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="form-label">Email Address (Read-only)</label>
            <input
              type="email"
              className="form-input"
              value={user?.email || ''}
              disabled
              style={{ opacity: 0.7, cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving Changes...' : 'Save Profile'}
            </button>
            <button
              type="button"
              className="nav-btn"
              style={{ padding: '0.85rem 1.5rem', background: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => setView('main')}
            >
              Back to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
