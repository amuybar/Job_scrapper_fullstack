# Job Board Application

## Django Backend
This is a Django-based web application that provides a job board platform for employers and job seekers. It includes features for listing job openings, user authentication, user profile management, job scraping, and password reset functionality.

## Features

- **Job Listing**: Employers can create and list job openings with details such as title, description, requirements, and specifications.
- **User Authentication**: Users (job seekers) can sign up, log in, and log out of the application. JSON Web Tokens (JWT) are used for authentication.
- **User Profile**: Job seekers can create and update their profiles, including personal information, resume, cover letter, LinkedIn profile, and portfolio website.
- **Job Scraping**: An API endpoint is provided to initiate web scraping for job listings from external sources.
- **Password Reset**: Users can request a password reset link via email, which allows them to set a new password.

## Installation

1. Clone the repository:
```
git clone
```

2. Install the required Python packages:
```
pip install -r requirements.txt
```

3. Set up the database and apply migrations:
```
python manage.py migrate
```

4. Create a superuser account (optional):
```
python manage.py createsuperuser
```

5. Start the development server:
```
python manage.py runserver
```

## API Endpoints

The following API endpoints are available:

- `GET /jobs/`: List all job openings.
- `POST /jobs/`: Create a new job opening (requires authentication).
- `POST /run-scraper/`: Initiate web scraping for job listings.
- `POST /login/`: Authenticate a user and obtain JWT tokens.
- `POST /signup/`: Create a new user account.
- `GET /user/`: Retrieve the authenticated user's details (requires authentication).
- `GET /profile/`: Retrieve the authenticated user's profile (requires authentication).
- `PUT /profile/`: Update the authenticated user's profile (requires authentication).
- `POST /forgot-password/`: Request a password reset link.
- `POST /reset-password/<uidb64>/<token>/`: Reset the user's password with a new password.


# Job Board Frontend

This is a React-based frontend application for a job board platform. It provides a user interface for job seekers to search and apply for job listings, as well as manage their profiles. The application integrates with a Django backend to fetch job data and handle user authentication.

## Features

- **Job Listing**: Displays a list of available job openings fetched from the backend API.
- **Search**: Users can search for job listings by entering keywords in the search bar.
- **Pagination**: Job listings are paginated for better organization and navigation.
- **Job Scraping**: Users can initiate web scraping to fetch new job listings from external sources.
- **Log Section**: Displays logs for the job scraping process.
- **User Authentication**: Users can sign up, log in, and log out of the application.
- **User Dashboard**: Authenticated users can access their dashboard to view and update their profiles.
- **Profile Management**: Users can update their personal information, resume, cover letter, LinkedIn profile, and portfolio website.
- **Job Application**: Users can apply for job listings by providing their resume and cover letter.

## Installation

1. Clone the repository:
```
git clone 
```

2. Install the required dependencies:
```
cd job-board-frontend
npm install
```

3. Start the development server:
```
npm start
```

The application should now be running at `http://localhost:3000`.

## File Structure

- `src/components/Dashboard.tsx`: Renders the user dashboard and profile management interface.
- `src/components/JobScraper.tsx`: Handles the job listing display, search functionality, job scraping, and job application.
- `src/components/LogSection.tsx`: Displays logs for the job scraping process.
- `src/components/Pagination.tsx`: Renders the pagination component for job listings.
- `src/components/JobCard.tsx`: Renders a single job card with details and an "Apply" button.




## Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with descriptive commit messages
4. Push your changes to your forked repository
5. Submit a pull request to the main repository

## License

This project is licensed under the [MIT License](LICENSE).