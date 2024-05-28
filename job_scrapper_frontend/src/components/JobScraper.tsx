// src/components/JobScraper.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Modal from './Modal';
import LogSection from './LogSection';
import Spinner from './Spinner';


interface JobData {
  id: number;
  title: string;
  description: string;
  requirements: string;
  specifications: string;
}

const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/scrape-jobs/');

const JobScraper: React.FC = () => {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [showlogDiv, setShowlogDiv] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cv, setCv] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const navigate = useNavigate();

  // check if token and set islogged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // logout
  const handleLogOut=()=>{
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login', { replace: true }); 
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<{ results: JobData[], count: number }>(
          `http://127.0.0.1:8000/api/jobs/?page=${currentPage}&search=${searchTerm}`
        );
        setJobs(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Error fetching jobs. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data.toString());
      setLogs((prevLogs) => [...prevLogs, dataFromServer.message]);
    };

    return () => {
      client.close();
    };
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleScrapeJobs = async () => {
    try {
      setIsScraping(true);
      setIsLoading(true);
      setShowlogDiv(true);
      setLogs(['Scraping jobs...']);
      await axios.post('http://127.0.0.1:8000/api/run-scraper/');
      setIsScraping(false);
      setIsLoading(false);
      setLogs((prevLogs) => [...prevLogs, 'Job scraping completed successfully.']);
      setShowlogDiv(false);
    } catch (error) {
      console.error('Error scraping jobs:', error);
      setIsScraping(false);
      setIsLoading(false);
      setError('Error scraping jobs. Please try again later.');
      setLogs((prevLogs) => [...prevLogs, 'Error scraping jobs. Please try again later.']);
    }
  };

  const handleApply = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCv(null);
    setCoverLetter('');
    setName('');
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (cv) formData.append('cv', cv);
    formData.append('coverLetter', coverLetter);
    formData.append('name', name);

    try {
      await axios.post('http://127.0.0.1:8000/api/apply/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleModalClose();
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  return (
    <div className="top">
      <h1>Job Listings</h1>
      {
        !isLoggedIn? (
          <div className="auth">
          <button onClick={() => navigate('/dashboard')}>DashBoard</button>
          <button onClick={handleLogOut}>Logout</button>
        </div>
        ) : (
          <div className="auth">
          <p>Join to have Specific jobs Automatically Applied for you every hour</p>
          <button onClick={() => navigate('/login')}>LogIn</button>
          <button onClick={() => navigate('/signup')}>SignUp</button>
        </div>
        )
      }
 
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <button onClick={handleScrapeJobs} disabled={isScraping}>
  {isScraping ? <Spinner /> : 'Scrape Jobs'}
</button>
      {showlogDiv && (
  <LogSection
    logs={logs}
    showlogDiv={showlogDiv}
    setShowlogDiv={setShowlogDiv}
    isLoading={isScraping}
  />
)}
      {error && <p className="error">{error}</p>}
      <h1>All Available Jobs</h1>
      <div className="job-cards">
  {isLoading ? (
    <Spinner />
  ) : (
    jobs.map((job) => (
      <JobCard key={job.id} job={job} handleApply={handleApply} />
    ))
  )}
</div>
      <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          handleFormSubmit={handleFormSubmit}
          cv={cv}
          setCv={setCv}
          coverLetter={coverLetter}
          setCoverLetter={setCoverLetter}
          name={name}
          setName={setName}
        />
      )}
    </div>
  );
};

export default JobScraper;
