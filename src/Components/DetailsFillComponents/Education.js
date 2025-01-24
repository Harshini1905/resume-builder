// Education.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '../InputComponents/TextField';
import { updateEducation, addArrayElement, removeArrayElement, updateErrorMessages } from '../../ReduxManager/dataStoreSlice';
import BottomNavigation from './BottomNavigation';

function Education(props) {
  const educationHeads = useSelector(state => state.dataStore.education);
  const dispatch = useDispatch();

  const onChangeHandler = (key, value, index, errorMessage = undefined) => {
    dispatch(updateEducation({ key, value, index }));
    if (errorMessage !== undefined) {
      dispatch(updateErrorMessages({ key, value: errorMessage, index }));
    }
  };

  function AddEducation() {
    dispatch(addArrayElement({
      key: 'education',
      element: {
        Type: "",
        University: "",
        Degree: "",
        Start: "",
        End: ""
      }
    }));
  }

  function RemoveEducation() {
    dispatch(removeArrayElement({ key: "education" }));
    const lastIndex = educationHeads.length - 1;
    dispatch(updateErrorMessages({ key: 'University', value: "", index: lastIndex }));
    dispatch(updateErrorMessages({ key: 'Degree', value: "", index: lastIndex }));
  }

  function yearRange(start, end) {
    let ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }
  
  let year = yearRange(2000, 2030);

  return (
    <div className="container p-4 font" style={{ textAlign: "left" }}>
      <h1>Education details</h1>
      <hr />
      {educationHeads.map((educationHeading, index) => (
        <div key={index}>
          <div className="row font">
            <div className="col-lg-6 col-12 pt-5 px-4">
              <label className='col-md-12 col-12' htmlFor="type">Type
                <select id="type" className="form-control" value={educationHeading.Type}
                  onChange={(e) => {
                    dispatch(updateEducation({
                      key: 'Type',
                      value: e.target.value,
                      index
                    }));
                  }}>
                  <option value='Graduation'>Graduation</option>
                  <option value='Post Graduation'>Post Graduation</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row font">
            <div className="col-lg-6 col-12 pt-5 px-4">
              <label className="col-md-12 col-12" htmlFor="University">University*
                <TextField type="text" elementId="University" placeholder='University' value={educationHeading.University}
                  onChange={(value, errorMessage) => onChangeHandler('University', value, index, errorMessage)}
                  validation={{ required: true }}
                />
              </label>
            </div>
            <div className="col-lg-6 col-12 pt-5 px-4">
              <label className="col-md-12 col-12" htmlFor="degree">Degree*
                <TextField type="text" elementId="Degree" placeholder='Degree' value={educationHeading.Degree}
                  onChange={(value, errorMessage) => onChangeHandler('Degree', value, index, errorMessage)}
                  validation={{ required: true }}
                />
              </label>
            </div>
          </div>
          <div className="row font">
            <div className="col-lg-6 col-12 pt-5 px-4">
              <label htmlFor="Start" className="col-md-12 col-12 col-form-label">Start year
                <select id="Start" className="form-control" value={educationHeading.Start}
                  onChange={(e) => {
                    dispatch(updateEducation({
                      key: 'Start',
                      value: e.target.value,
                      index
                    }));
                  }}>
                  <option>Select year</option>
                  {year.map((yr, i) => <option key={i} value={yr}>{yr}</option>)}
                </select>
              </label>
            </div>
            <div className="col-lg-6 col-12 pt-5 px-4">
              <label htmlFor="end" className="col-md-12 col-12 col-form-label">End year
                <select id="end" className="form-control" value={educationHeading.End}
                  onChange={(e) => {
                    dispatch(updateEducation({
                      key: 'End',
                      value: e.target.value,
                      index
                    }));
                  }}>
                  <option>Select year</option>
                  {year.map((yr, i) => <option key={i} value={yr}>{yr}</option>)}
                </select>
              </label>
            </div>
          </div>
        </div>
      ))}
      <div className='d-flex'>
        <button className='btn btn-primary mt-3 me-5 mb-3 ml-1 p-2' onClick={AddEducation}>
          Add new
        </button>
        <button className='btn btn-primary mt-3 ms-5 mb-3 ml-1 p-2' onClick={RemoveEducation}>
          Remove
        </button>
      </div>
      <BottomNavigation prevPagePath='/detailsfillingpage/workex' nextPagePath='/detailsfillingpage/keyskills' isFormValid={props.isFormValid} />
    </div>
  );
}

export default Education;
