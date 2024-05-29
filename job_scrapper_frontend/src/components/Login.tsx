import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { login } from '../service/auth'; 
import '../styles/Login.scss';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Call the login function from your auth service
      const userData = await login(username, password);
      const token = userData.access;
      localStorage.setItem('token', token);
      console.table(userData);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Invalid username or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="show-password-button"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner size={24} /> : 'Login'}
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      <div className="login-options">
        <button className="login-option">Sign in with Google</button>
        <button className="login-option">Sign in with Facebook</button>
      </div>
      <div className="login-footer">
        <a href="/forgot-password" className="forgot-password-link">
          Forgot password?
        </a>
      </div>
    </div>
  );
}

export default Login;
