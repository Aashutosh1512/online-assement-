import { createSlice } from "@reduxjs/toolkit"

//reducer allows to specify and  dispatch an action 
//action allows to change the value of store 

export const quizReducer=createSlice({
    name:'quiz',
    initialState:{
        selectedSubject: null,
        selectedDifficulty: null
    },
    reducers:{
        setSelectedSubject:(state, action)=>{
         state.selectedSubject = action.payload;
        },
        setSelectedDifficulty:(state, action)=>{
         state.selectedDifficulty = action.payload;
        },
    }
})

export const { setSelectedSubject, setSelectedDifficulty } = quizReducer.actions;
export default quizReducer.reducer;