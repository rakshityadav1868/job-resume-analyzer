import { useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { UploadCloud, FileText, Briefcase, Zap, ChevronRight, Activity, Award } from "lucide-react"

function App() {
  const [resume, setResume] = useState("")
  const [jobdesc, setJobDesc] = useState("")
  const [score, setScore] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeResume = async () => {
    if (!resume || !jobdesc) return;
    setIsAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append("resume_text", resume)
      formData.append("job_description", jobdesc)
      const response = await axios.post("http://localhost:8000/analyze", formData)
      setScore(response.data.match_score)
    } catch (error) {
      console.error("Analysis failed", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = () => {
    if (score === null) return "text-white"
    if (score >= 70) return "text-emerald-400"
    if (score >= 50) return "text-yellow-400"
    return "text-rose-400"
  }

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-6 sm:p-12">
      {/* Background Aurora Elements */}
      <div className="aurora-bg">
        <div className="aurora-gradient aurora-1"></div>
        <div className="aurora-gradient aurora-2"></div>
        <div className="aurora-gradient aurora-3"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl flex flex-col items-center z-10"
      >
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4 backdrop-blur-md"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium tracking-wider text-emerald-100 uppercase">AI Powered Analysis</span>
          </motion.div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white font-sans">
            Align your <span className="font-serif italic text-emerald-400 font-normal">Resume</span>
            <br /> with the perfect <span className="font-serif italic text-cyan-400 font-normal">Role</span>
          </h1>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed mt-6">
            Paste your resume and job description. Our advanced AI will analyze the semantic match and provide actionable feedback instantly.
          </p>
        </div>

        {/* Main Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
          
          {/* Job Description Input */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel rounded-3xl p-6 flex flex-col"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-xl">
                <Briefcase className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold text-white/90">Job Description</h2>
            </div>
            <textarea
              className="glass-input flex-1 rounded-2xl p-4 min-h-[200px] resize-none text-sm leading-relaxed"
              value={jobdesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the target job description here..."
            />
          </motion.div>

          {/* Resume Input */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel rounded-3xl p-6 flex flex-col"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-xl">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-white/90">Your Resume</h2>
            </div>
            <textarea
              className="glass-input flex-1 rounded-2xl p-4 min-h-[200px] resize-none text-sm leading-relaxed"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your current resume content here..."
            />
          </motion.div>

        </div>

        {/* Analyze Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={analyzeResume}
          disabled={isAnalyzing || !resume || !jobdesc}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-emerald-500 font-sans rounded-full hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]"
        >
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
            <div className="relative h-full w-8 bg-white/20" />
          </div>
          {isAnalyzing ? (
            <span className="flex items-center space-x-2">
              <Activity className="w-5 h-5 animate-pulse" />
              <span>Analyzing...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>Analyze Match</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </motion.button>

        {/* Results Section */}
        <AnimatePresence>
          {score !== null && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mt-12 glass-panel rounded-3xl p-8 w-full max-w-lg text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50"></div>
              
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <Award className={`w-8 h-8 ${getScoreColor()}`} />
                </div>
              </div>
              
              <h3 className="text-xl font-medium text-white/80 mb-2">Match Score</h3>
              
              <div className="flex items-baseline justify-center space-x-1 mb-4">
                <span className={`text-6xl font-bold tracking-tighter ${getScoreColor()}`}>
                  {score}
                </span>
                <span className="text-2xl text-white/40 font-medium">%</span>
              </div>
              
              <p className={`text-lg font-medium ${getScoreColor()} bg-white/5 inline-block px-4 py-2 rounded-full border border-white/10`}>
                {score >= 70 ? "Excellent Match! You're a strong candidate." : score >= 50 ? "Good Match. Consider highlighting key skills more." : "Needs Tailoring. Add more relevant keywords."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
      </motion.div>
    </div>
  )
}

export default App