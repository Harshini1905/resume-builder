// models/resume.js
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
  },
  workEx: [{
    title: String,
    orgName: String,
    startYear: String,
    endYear: String,
  }],
  education: [{
    degree: String,
    university: String,
    start: String,
    end: String,
  }],
  skills: [{
    skillName: String,
  }],
});

const Resume = mongoose.model('Resume', ResumeSchema);

module.exports = Resume;
