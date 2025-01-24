// DetailsFillingPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PersonalInfo from './PersonalInfo';
import WorkEx from './WorkEx';
import Education from './Education';
import KeySkills from './KeySkills';
import Preview from './Preview'; // Add a preview page
import { updateState } from '../../ReduxManager/dataStoreSlice';

function DetailsFillingPage() {
  const dispatch = useDispatch();

  const personalInfo = useSelector(state => state.dataStore.personalInfo);
  const workEx = useSelector(state => state.dataStore.workEx);
  const education = useSelector(state => state.dataStore.education);
  const skills = useSelector(state => state.dataStore.skills);
  const errorMessages = useSelector(state => state.dataStore.errorMessages);

  let isFormValid = true;
  for (let key in errorMessages) {
    if (errorMessages[key] !== "") {
      isFormValid = false;
      break;
    }
  }

  const onSideNavLinkClick = () => {
    if (!isFormValid) {
      alert('Please fill all the necessary details correctly!');
      dispatch(updateState({ key: 'showErrorMessages', value: true }));
    } else {
      dispatch(updateState({ key: 'showErrorMessages', value: false }));
    }
  };

  const handleSave = async () => {
    const resumeData = { personalInfo, workEx, education, skills };
    try {
      const response = await axios.post('http://localhost:5000/api/save-resume', resumeData);
      if (response.status === 200) {
        alert('Resume saved successfully!');
      } else {
        alert('Failed to save resume.');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume.');
    }
  };

  return (
    <div>
      <div className="container text-center" style={{ maxWidth: "1920px", marginTop: "12px", backgroundColor: "#fafafa" }}>
        <div>
          <div className='row' style={{ minHeight: '100vh' }}>
            <div className="col-lg-3 col-sm-12 col-12 sidebar">
              <li className="list-item" onClick={onSideNavLinkClick}>
                <Link to={isFormValid ? "/detailsfillingpage/personalinfo" : '#'} className='no-text-decoration'>
                  Personal Info
                </Link>
              </li>
              <li className="list-item" onClick={onSideNavLinkClick}>
                <Link to={isFormValid ? "/detailsfillingpage/workex" : '#'} className='no-text-decoration'>
                  Work Experience
                </Link>
              </li>
              <li className="list-item" onClick={onSideNavLinkClick}>
                <Link to={isFormValid ? "/detailsfillingpage/education" : '#'} className='no-text-decoration'>
                  Education
                </Link>
              </li>
              <li className="list-item" onClick={onSideNavLinkClick}>
                <Link to={isFormValid ? "/detailsfillingpage/keyskills" : '#'} className='no-text-decoration'>
                  Key Skills
                </Link>
              </li>
              <li className="list-item" onClick={onSideNavLinkClick}>
                <Link to={isFormValid ? "/detailsfillingpage/preview" : '#'} className='no-text-decoration'>
                  Preview & Save Resume
                </Link>
              </li>
            </div>

            <div className="content col-lg-9 col-sm-12 col-12" style={{ border: "solid grey 2px", boxShadow: "5px 5px 8px 10px #888888" }}>
              <Routes>
                <Route exact path="/personalinfo" element={<PersonalInfo isFormValid={isFormValid} />} />
                <Route exact path="/workex" element={<WorkEx isFormValid={isFormValid} />} />
                <Route exact path="/education" element={<Education isFormValid={isFormValid} />} />
                <Route exact path="/keyskills" element={<KeySkills isFormValid={isFormValid} />} />
                <Route exact path="/preview" element={<Preview handleSave={handleSave} />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsFillingPage;
