import { useState } from "react"
import axios from "axios"

function App() {
  const [resume, setResume] = useState("")
  const [jobdesc, setJobDesc] = useState("")
  const [score, setScore] = useState(null)

  const analyzeResume = async () => {
    const formData = new FormData() // FormData is kind of object used to store data in form format
    formData.append("resume_text", resume)
    formData.append("job_description", jobdesc)
    const response = await axios.post("http://localhost:8000/analyze", formData)
    setScore(response.data.match_score)
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Resume Analyzer</h1>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Job Description:</label>
        <textarea
          value={jobdesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the job description here..."
          style={{
            width: "100%",
            height: "150px",
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontFamily: "Arial"
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Resume:</label>
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste your resume here..."
          style={{
            width: "100%",
            height: "150px",
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontFamily: "Arial"
          }}
        />
      </div>

      <button
        onClick={analyzeResume}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "30px"
        }}
      >
        Analyze Resume
      </button>

      {score !== null && (
        <div style={{
          padding: "30px",
          backgroundColor: "#f0f8ff",
          border: "2px solid #4CAF50",
          borderRadius: "10px",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#333", marginBottom: "10px" }}>Match Score</h2>
          <div style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: score >= 70 ? "#4CAF50" : score >= 50 ? "#FF9800" : "#f44336",
            marginBottom: "10px"
          }}>
            {score}%
          </div>
          <p style={{ color: "#666", fontSize: "14px" }}>
            {score >= 70 ? "Great Match! 🎉" : score >= 50 ? "Good Match! 👍" : "Needs Improvement 💡"}
          </p>
        </div>
      )}
    </div>
  )
}

export default App