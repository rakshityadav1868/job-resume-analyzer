import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [resume, setResume] = useState("")
  const [jobdesc, setJobDesc] = useState("")
  const [score, setScore] = useState(null)
  
  // Theme state
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (prefersDark) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const analyzeResume = async () => {
    const formData = new FormData() // FormData is kind of object used to store data in form format
    formData.append("resume_text", resume)
    formData.append("job_description", jobdesc)
    const response = await axios.post("http://localhost:8000/analyze", formData)
    setScore(response.data.match_score)
  }

  const getScoreColor = () => {
    if (score === null) return "var(--text-color)"
    if (score >= 70) return "var(--success-color)"
    if (score >= 50) return "var(--warning-color)"
    return "var(--danger-color)"
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>Resume Analyzer</h1>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      <div className="input-group">
        <label>Job Description</label>
        <textarea
          value={jobdesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the job description here..."
        />
      </div>

      <div className="input-group">
        <label>Resume</label>
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste your resume here..."
        />
      </div>

      <button
        className="analyze-btn"
        onClick={analyzeResume}
      >
        Analyze Resume
      </button>

      {score !== null && (
        <div className="result-card">
          <div className="result-title">Match Score</div>
          <div className="score-display" style={{ color: getScoreColor() }}>
            {score}%
          </div>
          <p className="score-text" style={{ color: getScoreColor() }}>
            {score >= 70 ? "Great Match! 🎉" : score >= 50 ? "Good Match! 👍" : "Needs Improvement 💡"}
          </p>
        </div>
      )}
    </div>
  )
}

export default App