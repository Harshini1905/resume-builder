// routes/resume.js
const express = require('express');
const router = express.Router();
const Resume = require('../models/resume');

// Middleware to log request details
router.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
  next();
});

// Route to save resume data
router.post('/save-resume', async (req, res) => {
  const resumeData = req.body;

  try {
    const newResume = new Resume(resumeData);
    await newResume.save();
    res.status(200).json({ message: 'Resume saved successfully!' });
  } catch (error) {
    console.error('Error saving resume data:', error.message);
    res.status(500).json({ error: 'Error saving resume data', details: error.message });
  }
});

// Route to get resume data
router.get('/get-resume', async (req, res) => {
  try {
    const resume = await Resume.findOne(); // Retrieve the first resume entry
    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume data:', error.message);
    res.status(500).json({ error: 'Error fetching resume data', details: error.message });
  }
});

module.exports = router;
