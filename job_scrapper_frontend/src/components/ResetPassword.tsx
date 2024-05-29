import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../service/auth';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { uidb64, token } = useParams<{ uidb64?: string; token?: string }>();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uidb64) {
      setMessage('An error occurred. Please try again later.');
      return;
    }

    if (!token) {
      setMessage('An error occurred. Please try again later.');
      return;
    }

    try {
      const response = await resetPassword(uidb64,password);
      setMessage(response.success);
    } catch (error:any) {
      setMessage(error.error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;