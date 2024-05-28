import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.scss';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token); 
      console.table(token)
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
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
        <button type="submit">Login</button>
      </form>
      <div className="login-options">
        <button className="login-option">Sign in with Google</button>
        <button className="login-option">Sign in with Facebook</button>
      </div>
      <div className="login-footer">
        <a href="/forgot-password" className="forgot-password-link">Forgot password?</a>
      </div>
    </div>
  );
}

export default Login;
