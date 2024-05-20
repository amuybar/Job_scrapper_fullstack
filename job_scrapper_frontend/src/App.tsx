// src/App.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './App.css';

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

  // States for modal and form inputs
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cv, setCv] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [name, setName] = useState<string>('');

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
  //  FUNCTION TO HANDLE SEARCH, IT WILL JUST FILTER THE  CARDS WITH THE SEARCH TERM
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  // HANDLING PAGINATION
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // INITIATE A NEW WEB SCRAP
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


  // FUNCTION TO HANDLE APPLY
  // SHOW A MODAL SHEET TO TAKE USER INPUTES SUCH AS CV,COVERLETTER AND NAME
  // Function to handle applying for a job
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
      <div className="input">
        <input
          className="inputf"
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <button onClick={handleScrapeJobs} disabled={isScraping}>
        {isScraping ? 'Scraping...' : 'Scrape Jobs'}
      </button>

      {showlogDiv && logs.length > 0 && (
        <div className="logs">
          {/*  button toggle logs div */}
          <button onClick={() => setShowlogDiv(!showlogDiv)}>
            {showlogDiv ? 'Hide Logs' : 'Show Logs'}
          </button>
          <h2>Active Logs</h2>
          <div className="log-messages">
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <h1>All Available Jobs</h1>
      {/* job cards */}
      <div className="job-cards">
        {isLoading ? (
          <p>Loading jobs...</p>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="job-card">
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p>{job.requirements}</p>
              <p>{job.specifications}</p>
              <button onClick={handleApply}>Apply</button>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {/* Modal for applying to job */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Apply for Job</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>CV:</label>
                <input
                  type="file"
                  onChange={(e) => setCv(e.target.files ? e.target.files[0] : null)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cover Letter:</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  required
                />
              </div>
              {/* submit and close div */}
              <div className="form-group">
                 <button type="submit">Submit</button>
                <button onClick={handleModalClose}>Close</button>
              </div>
              
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default JobScraper;
