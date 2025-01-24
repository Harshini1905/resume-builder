// Preview.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Preview = ({ handleSave }) => {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-resume');
        setResumeData(response.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };
    fetchResume();
  }, []);
  

  if (!resumeData) {
    return <p>Loading...</p>;
  }

  const { personalInfo, workEx, education, skills } = resumeData;

  return (
    <div>
      <h2>Preview Your Resume</h2>
      <div>
        <h3>Personal Info</h3>
        <p>{personalInfo.firstName} {personalInfo.lastName}</p>
        <p>{personalInfo.email}</p>
        <p>{personalInfo.mobile}</p>
      </div>

      <div>
        <h3>Work Experience</h3>
        {workEx.map((job, index) => (
          <div key={index}>
            <p>{job.title} at {job.orgName}</p>
            <p>{job.startYear} - {job.endYear}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Education</h3>
        {education.map((school, index) => (
          <div key={index}>
            <p>{school.degree} from {school.university}</p>
            <p>{school.start} - {school.end}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Key Skills</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill.skillName}</li>
          ))}
        </ul>
      </div>

      <button onClick={handleSave} className="btn btn-primary">
        Save Resume
      </button>
    </div>
  );
};

export default Preview;
