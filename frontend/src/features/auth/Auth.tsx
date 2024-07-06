import React, { useState } from 'react';
import { useLoginMutation } from '../../services/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import './Auth.css'; // Import your CSS file for styling

const Auth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to hold error message
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const user = await login({ username, password }).unwrap();
      dispatch(setCredentials(user));
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Failed to login:', err);
      setError('Failed to login. Please check your username and password.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
