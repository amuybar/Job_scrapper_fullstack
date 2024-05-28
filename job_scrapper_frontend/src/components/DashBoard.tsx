// src/components/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.scss';

const Dashboard: React.FC = () => {
  const [appliedJobsCount, setAppliedJobsCount] = useState<number>(0);
  const [userData, setUserData] = useState<any>(null); // Placeholder for user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Token not found in local storage
          throw new Error('Token not found');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/user/`, {
          headers: {
            Authorization: `Token ${token}`, 
          },
        });
        console.log(response);
 
        setUserData(response.data);
        // Assuming you have a field in user data that holds the count of applied jobs
        setAppliedJobsCount(response.data.appliedJobsCount);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <div className="user-info">
        <p>Username: {userData?.username}</p>
        <p>Email: {userData?.email}</p>
      </div>
      <div className="applied-jobs">
        <h2>Total Applied Jobs: {appliedJobsCount}</h2>
      </div>
      <div className="apply-button">
        <Link to="/apply" className="apply-link">
          Apply for Jobs
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
