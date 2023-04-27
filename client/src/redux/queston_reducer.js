import { createSlice } from "@reduxjs/toolkit"



//reducer allows to specify and  dispatch an action 
//action allows to change the value of store 

export const questionReducer=createSlice({
    name:'questions ',
    initialState:{
        queue:[],//storing all the questions from data base in the queue variable whose datatype is array 
        answers:[],//storing all the correct answer

        trace:0  //it track the user question eg if user go to next quesion it increment by 1 and decrement , when user go to prev question 
    },
    reducers:{
        startExamAction:(state,action)=>{
            let {question,answers}=action.payload
         return {
            ...state,
            queue:question,
            answers
         }
        },

        moveNextAction:(state)=>{
           // if (state.trace+1<data.length)
            return {
                ...state,
                trace:state.trace+1
            }
        }
        ,
        movePrevAction:(state)=>{
            if (state.trace+1>1)
            return {
                ...state,
                
                trace: state.trace-1
            }
        },
        resetAllAction:()=>{
            return {
                queue:[],
                answer:[],
                trace:0
            }
        }

       
    }

})

export const{startExamAction,moveNextAction,movePrevAction,resetAllAction}= questionReducer.actions;
export default questionReducer.reducer;