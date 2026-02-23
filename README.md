# AI Resume Analyzer

A full-stack application that analyzes resumes against job descriptions using natural language processing and machine learning techniques to calculate match scores.

## Project Overview

The AI Resume Analyzer is designed to help match resumes with job descriptions by computing a similarity score. It uses advanced NLP techniques including tokenization, stopword removal, lemmatization, and TF-IDF vectorization combined with cosine similarity to determine how well a resume aligns with a job posting.

## Tech Stack

### Backend
- FastAPI - Modern Python web framework for building APIs
- NLTK - Natural Language Toolkit for text processing
- Scikit-learn - Machine learning library for TF-IDF vectorization and cosine similarity
- Python 3.x

### Frontend
- React - JavaScript library for building user interfaces
- Vite - Next generation frontend tooling for fast development
- JavaScript/JSX

## Project Structure

```
resume_anlyzer/
├── backend/
│   ├── main.py              # FastAPI application and core logic
│   ├── requirements.txt      # Python dependencies
│   └── __pycache__/         # Python cache files
└── frontend/
    ├── src/
    │   ├── App.jsx          # Main React component
    │   ├── App.css          # Application styles
    │   ├── main.jsx         # React entry point
    │   ├── index.css        # Global styles
    │   └── assets/          # Static assets
    ├── public/              # Public assets
    ├── index.html           # HTML entry point
    ├── package.json         # Node dependencies
    ├── vite.config.js       # Vite configuration
    └── eslint.config.js     # ESLint configuration
```

## Features

- Text preprocessing with lowercase conversion and special character removal
- Tokenization for breaking text into individual words
- Stopword filtering to remove common English words
- Lemmatization to convert words to their root form
- TF-IDF vectorization for numerical representation of text
- Cosine similarity calculation to determine resume-job description match
- RESTful API endpoint for analysis
- Cross-Origin Resource Sharing (CORS) enabled for frontend integration

## Backend Setup

### Prerequisites
- Python 3.x
- pip package manager

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install required dependencies:
```bash
pip install -r requirements.txt
```

### Running the Backend

Start the FastAPI server:
```bash
python main.py
```

The server will run on `http://localhost:8000` by default.

## Frontend Setup

### Prerequisites
- Node.js
- npm package manager

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Frontend

Start the development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or the port shown in terminal).

## API Documentation

### Analyze Resume Endpoint

**POST** `/analyze`

Analyzes a resume against a job description and returns a match score.

**Request Parameters:**
- `resume_text` (string, form data) - The resume content
- `job_description` (string, form data) - The job description content

**Response:**
```json
{
  "match_score": 75.45
}
```

The match score is a percentage value between 0 and 100, indicating how well the resume matches the job description.

## How It Works

1. **Text Preprocessing**: Both resume and job description are converted to lowercase and special characters are removed.

2. **Tokenization**: The cleaned text is split into individual words.

3. **Stopword Removal**: Common English words that don't add significant meaning are filtered out.

4. **Lemmatization**: Words are converted to their root form to normalize similar words.

5. **Vectorization**: The preprocessed text is converted to numerical vectors using TF-IDF (Term Frequency-Inverse Document Frequency).

6. **Similarity Calculation**: Cosine similarity is calculated between the resume and job description vectors.

7. **Score Generation**: The similarity score is multiplied by 100 to get a percentage match score.

## Dependencies

### Backend Requirements
- fastapi
- nltk
- scikit-learn
- python-multipart
- uvicorn

See `backend/requirements.txt` for complete list.

### Frontend Dependencies
- react
- react-dom
- vite

See `frontend/package.json` for complete list.

## Development Notes

The backend includes inline comments explaining key NLP concepts and regex patterns used in text preprocessing. The CORS middleware is configured to accept requests from all origins, which can be restricted in production by specifying allowed origins instead of using "*".

## Future Improvements

- Add support for multiple resume formats (PDF, DOCX)
- Implement more sophisticated NLP models
- Add skill extraction and matching
- Create a database to store analysis history
- Add user authentication and profiles
- Improve UI/UX with more detailed analysis reports

## License

This project is open source and available under the MIT License.

## Author

Rakshit Yadav
