// src/components/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.scss';
import { apiClient } from '../service/auth';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<any>({
    full_name: '',
    phone_number: '',
    resume: null,
    cover_letter: '',
    linkedin_profile: '',
    portfolio_website: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log('Stored token:', token);
  
      if (token) {
        setIsAuthenticated(true);
        try {
          const response = await apiClient.get('/user/', {
            headers: {
              Authorization: `Bearer  ${token}`
            }
          });
          console.log('Response:', response.data);
          setUserData(response.data);
  
          // Additional logic for fetching profile data if needed
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setProfileData({
        ...profileData,
        [name]: files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in profileData) {
      formData.append(key, profileData[key]);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.put('/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="dashboard">
      {isAuthenticated ? (
        <>
          <h1>Dashboard</h1>
          <div className="user-info">
            <p>Username: {userData?.username}</p>
            <p>Email: {userData?.email}</p>
          </div>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={profileData.full_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={profileData.phone_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="resume">Resume</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cover_letter">Cover Letter</label>
                <textarea
                  id="cover_letter"
                  name="cover_letter"
                  value={profileData.cover_letter}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="linkedin_profile">LinkedIn Profile</label>
                <input
                  type="url"
                  id="linkedin_profile"
                  name="linkedin_profile"
                  value={profileData.linkedin_profile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="portfolio_website">Portfolio Website</label>
                <input
                  type="url"
                  id="portfolio_website"
                  name="portfolio_website"
                  value={profileData.portfolio_website}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Update Profile</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <h2>Your Profile</h2>
              <div className="profile-info">
                <p>Full Name: {profileData.full_name}</p>
                <p>Phone Number: {profileData.phone_number}</p>
                <p>
                  LinkedIn Profile:{' '}
                  <a
                    href={profileData.linkedin_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileData.linkedin_profile}
                  </a>
                </p>
                <p>
                  Portfolio Website:{' '}
                  <a
                    href={profileData.portfolio_website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileData.portfolio_website}
                  </a>
                </p>
                <p>
                  Resume:{' '}
                  <a href={profileData.resume} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </p>
              </div>
              <button onClick={() => setIsEditing(true)}>Update Profile</button>
            </div>
          )}
          <div className="apply-button">
            <Link to="/apply" className="apply-link">
              Apply for Jobs
            </Link>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div>
          <p>You need to be logged in to access the dashboard.</p>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;