import { createSlice } from '@reduxjs/toolkit'

export const dataStoreSlice = createSlice({
  name: 'dataStore',
  initialState: {
        personalInfo:{
                firstName:"",
                lastName:"",
                Email:"",
                Mobile:"",
                Address1:"",
                Address2:"",
                City:"",
                State:"",
                Pin:"",
                Objective:""
        },
        workEx: [
                {
                    title:"",
                    orgName:"",
                    startYear:"",
                    endYear:"",
                    jobDescription:"",
                }
        ],
        education:[
          {
                Type:"Graduation",
                University:"",
                Degree:"",
                Start:"",
                End:""
        }],
        skills:[{skillName:""}] ,
        selectedTemplate:"",
        imageFile:null,
        errorMessages:{},
        showErrorMessages:false,
  },


  reducers: {
    
    updatePersonalInfo: (state,action) => { 
      //this function updates the targeted key of the personalInfo element of dataStore //
        state.personalInfo[action.payload.key] =action.payload.value
    },

    updateWorkEx: (state,action) =>{
      //this function updates the targeted key of the workEx element of dataStore //
        state.workEx[action.payload.index][action.payload.key] = action.payload.value
    },
    updateEducation: (state,action) =>{
      //this function updates the targeted key of the education element of dataStore //
      state.education[action.payload.index][action.payload.key] = action.payload.value
    },
    updateKeySkills: (state,action) =>{
      //this function updates the targeted key of the keySkills element of dataStore //
      state.skills[action.payload.index][action.payload.key] = action.payload.value
    },
    updateState: (state,action) =>{
      //this function can be called to update any targeted element of dataStore //
      state[action.payload.key]=action.payload.value
    },
    updateErrorMessages: (state,action) =>{
      //this function updates errorMessages element of dataStore //
      let key = action.payload.key
      if(action.payload.index){
        key+='_'+action.payload.index
      }
      state.errorMessages[key]=action.payload.value
    },
    addArrayElement: (state, action) => {
      state.keySkills.push(action.payload); // Adjust based on where you want to add
    },
    removeArrayElement: (state, action) => {
      state.keySkills = state.keySkills.filter((_, index) => index !== action.payload);
    },
    updateKeySkills: (state, action) => {
      state.keySkills = action.payload; // Update with new array or modify as needed
    },

  }
})

export const { updatePersonalInfo, updateWorkEx,updateEducation,updateKeySkills,
  updateErrorMessages, updateState,addArrayElement,removeArrayElement } = dataStoreSlice.actions

export default dataStoreSlice.reducer