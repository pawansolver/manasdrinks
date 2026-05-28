// @ts-nocheck
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const jobs = [
  {
    id: 1,
    title: "Brand Ambassador",
    department: "Marketing",
    location: "Mumbai, India (Hybrid)",
    type: "Full-Time",
    description: "Represent the Daura brand at extreme sports events, festivals, and university campuses. Fuel community growth and engage with local energy hubs.",
    requirements: ["Excellent communication skills", "Passion for extreme sports & gaming", "Prior event management experience is a plus"]
  },
  {
    id: 2,
    title: "3D Frontend Developer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-Time",
    description: "Build immersive, state-of-the-art WebGL/Three.js experiences to showcase our new dynamic energy drink configurations online.",
    requirements: ["Strong React, Next.js, and TypeScript skills", "Experience with Three.js or React Three Fiber", "Eye for premium aesthetics & animations"]
  },
  {
    id: 3,
    title: "Creative Designer",
    department: "Design",
    location: "Bangalore, India",
    type: "Full-Time",
    description: "Design premium labels, promotional poster arts, and digital campaigns for our limited edition drops and F1 collaborations.",
    requirements: ["Proficient in Photoshop, Illustrator, and Figma", "Portfolio showing bold, high-contrast layouts", "3D rendering skills is a plus"]
  },
  {
    id: 4,
    title: "Marketing Coordinator",
    department: "Marketing",
    location: "Delhi NCR, India (On-site)",
    type: "Contract",
    description: "Coordinate with influencer networks, gaming streams, and athletes for product sponsorships and digital branding campaigns.",
    requirements: ["Experience managing influencer relationships", "Familiarity with Twitch, YouTube, and Instagram metrics", "Highly organized with strong negotiation skills"]
  }
];

const Career = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", resume: "" });

  const handleApply = (job) => {
    setSelectedJob(job);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in your name and email.");
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", resume: "" });
  };

  return (
    <div className="bg-neutral-950 text-neutral-200 min-h-screen font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-40 pb-20 px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase mb-4"
          >
            Join the <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Energy</span> Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            We are looking for passionate, high-octane individuals to redefine energy, style, and Web3D technologies together.
          </motion.p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-neutral-900 border border-neutral-800 hover:border-cyan-400/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-500/5 group"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {job.title}
                  </h3>
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs px-3 py-1 rounded-full font-semibold">
                    {job.type}
                  </span>
                </div>
                <div className="text-sm text-neutral-400 mb-4 flex gap-4">
                  <span>🏢 {job.department}</span>
                  <span>📍 {job.location}</span>
                </div>
                <p className="text-neutral-300 text-sm mb-6 leading-relaxed">
                  {job.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Requirements</h4>
                  <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                    {job.requirements.map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleApply(job)}
                className="w-full py-3 bg-neutral-800 hover:bg-cyan-400 text-white hover:text-black font-bold uppercase tracking-wider rounded-xl transition-all duration-300 border border-neutral-700 hover:border-cyan-400"
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 md:p-8 relative shadow-2xl shadow-cyan-500/10"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xl"
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">Apply for Role</h3>
                  <p className="text-cyan-400 text-sm mb-6 font-semibold">{selectedJob.title}</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1">Resume / Portfolio Link</label>
                      <input
                        type="text"
                        value={formData.resume}
                        onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                        className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-bold uppercase tracking-wider rounded-lg transition-all"
                    >
                      Submit Application
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <span className="text-5xl mb-4 block">🎉</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    Thank you for applying. We will review your application and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Career;
