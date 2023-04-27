import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";

//
import { getServerData } from "../helper/helper";

import * as Action from '../redux/queston_reducer';
//fetch question hook to fetch api data and set value to store
 export const useFetchQestion=()=>{
    const dispatch=useDispatch();
    const [getData,setGetData]= useState({
        isLoading:false,
        apiData:[],
        serverError:null});

        useEffect(()=>{
            setGetData(prev=>({...prev,isLoading:true}));
           
            (async()=>{
              try {
                
                //let question=await data;
                //
            const [{questions,answers}]=    await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data)=>data);
           console.log({questions,answers});
              
                 if (questions.length>0){
                    setGetData(prev=>({...prev,isLoading:false}));
                    setGetData(prev=>({...prev,apiData:{questions,answers}}));

                    /** dipatch an action*/ 
                    dispatch(Action.startExamAction({question:questions,answers}))
                 }
                 else{
                    throw new Error("No Question Avalibale");
                 }
              } catch (error) {
                setGetData(prev=>({...prev,isLoading:false}));
                setGetData(prev=>({...prev,isLoading:error}));
              }


            })();





        },[dispatch]);

        return [getData,setGetData]
    

 }

 export const moveNextQuestion=()=>async(dispatch)=>{
    try {
        dispatch(Action.moveNextAction())
    } catch (error) {
        console.log(error)
    }
 }
  export const movePrevQuestion=()=>async(dispatch)=>{
    try {
        dispatch(Action.movePrevAction())
    } catch (error) {
        console.log(error)
    }
 }
 

 