import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.scss';
import Spinner from './Spinner';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username,
        email,
        password,
      });
      // Handle successful signup
      console.log(response.data);
      navigate('/dashboard'); // Navigate to the dashboard after successful signup
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Failed to create account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
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
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Confirm Password:
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="show-password-button"
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner size={24} /> : 'Sign Up'}
        </button>
        <h3 onClick={() => navigate('/login')}>
          Already have an account?
        </h3>
      </form>
      <div className="signup-options">
        <button className="signup-option">Google</button>
        <button className="signup-option">Facebook</button>
        
      </div>
    </div>
  );
}

export default Signup;