// dataStoreSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const dataStoreSlice = createSlice({
  name: 'dataStore',
  initialState: {
    personalInfo: {
      firstName: "",
      lastName: "",
      Email: "",
      Mobile: "",
      Address1: "",
      Address2: "",
      City: "",
      State: "",
      Pin: "",
      Objective: ""
    },
    workEx: [
      {
        title: "",
        orgName: "",
        startYear: "",
        endYear: "",
        jobDescription: "",
      }
    ],
    education: [
      {
        Type: "Graduation",
        University: "",
        Degree: "",
        Start: "",
        End: ""
      }
    ],
    skills: [{ skillName: "" }],
    selectedTemplate: "",
    imageFile: null,
    errorMessages: {},
    showErrorMessages: false,
  },

  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo[action.payload.key] = action.payload.value;
    },

    updateWorkEx: (state, action) => {
      state.workEx[action.payload.index][action.payload.key] = action.payload.value;
    },

    updateEducation: (state, action) => {
      state.education[action.payload.index][action.payload.key] = action.payload.value;
    },

    updateKeySkills: (state, action) => {
      state.skills[action.payload.index][action.payload.key] = action.payload.value;
    },

    updateState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },

    updateErrorMessages: (state, action) => {
      let key = action.payload.key;
      if (action.payload.index) {
        key += '_' + action.payload.index;
      }
      state.errorMessages[key] = action.payload.value;
    },

    addArrayElement: (state, action) => {
      state[action.payload.key].push(action.payload.element);
    },

    removeArrayElement: (state, action) => {
      state[action.payload.key] = state[action.payload.key].slice(0, -1);
    },
  }
});

export const {
  updatePersonalInfo,
  updateWorkEx,
  updateEducation,
  updateKeySkills,
  updateErrorMessages,
  updateState,
  addArrayElement,
  removeArrayElement
} = dataStoreSlice.actions;

export default dataStoreSlice.reducer;
