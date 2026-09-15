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
        if (onRegisterSuccess) {
          onRegisterSuccess({
            email: json.email,
            firstName: json.firstName || firstName,
            lastName: json.lastName || lastName,
            token: json.authtoken
          });
        }
        if (setView) setView('main');
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
    <div className="modal-overlay">
      <div className="modal-card">
        <form onSubmit={handleRegister}>
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
