import React, { useState } from 'react';
import { urlConfig } from '../../config';

export default function RegisterPage({ onRegisterSuccess, setView }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        }),
      });

      const json = await response.json();

      if (response.ok && json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', json.email);
        sessionStorage.setItem('firstName', json.firstName || firstName);
        sessionStorage.setItem('lastName', json.lastName || lastName);
        onRegisterSuccess({
          email: json.email,
          firstName: json.firstName || firstName,
          lastName: json.lastName || lastName,
          token: json.authtoken
        });
        setView('main');
      } else {
        setError(json.error || 'Registration failed.');
      }
    } catch (err) {
      console.error("Register fetch error:", err);
      setError('Cannot connect to registration server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setView('main')}>
      <div className="modal-card" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()} id="register-modal-card">
        <button className="modal-close" onClick={() => setView('main')}>✕</button>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>Join GiftLink</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Create an account to start sharing and claiming free items
        </p>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', color: '#f87171', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister} id="register-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Imad"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                id="register-firstname"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Durrani"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                id="register-lastname"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              id="register-email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Create a strong password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              id="register-password"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading} id="register-submit-btn">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <span
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
            onClick={() => setView('login')}
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}
