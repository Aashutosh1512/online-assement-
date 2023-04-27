import React ,{useEffect, useState}from 'react'
import Questions from './Questions'
//redux store import 
import {useSelector,useDispatch} from 'react-redux'
import { moveNextQuestion,movePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import {Navigate} from 'react-router-dom'

export default function Quiz() {
   
   //next button event handler 
   //const trace=useSelector(state=>state.questions.trace);
   const [check,setChecked]=useState(undefined)
   const q = useSelector(state => state.questions.queue[state.questions.trace])
   const result=useSelector(state=>state.result.result);
   const {queue,trace}=useSelector(state=>state.questions);
   const dispatch=useDispatch()
   

  function onNext(){
    console.log("on next click")
    
    if (trace<queue.length){
      //increase the trace value by one using MoveNextAction 
    dispatch(moveNextQuestion());
    
    // insert a new result in the array . 
    if (result.length<=trace){
    dispatch(PushAnswer(check));}
    

  }
  //reset the value of the checked variable 
    setChecked(undefined);

  }
  //previous button event handler 
  function onPrev(){
    console.log("on prev click")
   
    dispatch(movePrevQuestion());
  }

  function onChecked(check){
   
    console.log(check)

    setChecked(check)
  }
  if (result.length && result.length>=queue.length){
   return <Navigate to={'/result'} replace="true"> </Navigate>
    //  return <Navigate to={'/user'} replace="true"> </Navigate>

  }
 
  
  if (trace+1<=4){

  return (
    
    
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      {/** displaying question  */}
      <Questions onChecked={onChecked}></Questions>
      <div className='grid'>
      <button className='btn prev' onClick={onPrev}>prev {"<<"}</button>
      <button className='btn next' onClick={onNext}>Next {">>"}</button>
       </div>

    </div>


   
  )}

  else {
    return (
    
    
      <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        {/** displaying question  */}
        <Questions onChecked={onChecked}></Questions>
        <div className='grid'>
        <button className='btn prev' onClick={onPrev}>prev {"<<"}</button>
        <button className='btn next' style={{ backgroundColor: 'red' }}  onClick={onNext}> Submit {">>"}</button>
         </div>
  
      </div>
  
  
     
    )

//style={}
  }
}

 