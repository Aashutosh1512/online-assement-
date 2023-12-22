import React, { useEffect, useState } from "react";
import Questions from "./Questions";
//redux store import
import { useSelector, useDispatch } from "react-redux";
import { moveNextQuestion, movePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";
import { Navigate } from "react-router-dom";
import {
  setSelectedSubject,
  setSelectedDifficulty,
} from "../redux/quiz_reducer";

export default function Quiz() {
  //next button event handler
  //const trace=useSelector(state=>state.questions.trace);
  const [check, setChecked] = useState(undefined);
  const q = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  const selectedSubject = useSelector((state) => state.quiz.selectedSubject);
  const selectedDifficulty = useSelector(
    (state) => state.quiz.selectedDifficulty
  );

  const handleSubjectChange = (e) => {
    dispatch(setSelectedSubject(e?.target?.value));
  };

  const handleDifficultyChange = (e) => {
    dispatch(setSelectedDifficulty(e?.target?.value));
  };

  function onNext() {
    console.log("on next click");

    if (trace < queue.length) {
      //increase the trace value by one using MoveNextAction
      dispatch(moveNextQuestion());

      // insert a new result in the array .
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }
    //reset the value of the checked variable
    setChecked(undefined);
  }
  //previous button event handler
  function onPrev() {
    console.log("on prev click");

    dispatch(movePrevQuestion());
  }

  function onChecked(check) {
    console.log(check);

    setChecked(check);
  }
  if (result.length && result.length >= queue.length) {
    return (
      <Navigate to={"/result"} replace="true">
        {" "}
      </Navigate>
    );
    //  return <Navigate to={'/user'} replace="true"> </Navigate>
  }

  const subjects = [
    {
      name: "Computer Network",
      value: "computer-network",
    },
    {
      name: "Java",
      value: "java",
    },
    {
      name: "Operating Systems",
      value: "os",
    },
    {
      name: "Database Management System",
      value: "dbms",
    },
  ];

  const difficulty = [
    {
      name: "Easy",
      value: "easy",
    },
    {
      name: "Medium",
      value: "medium",
    },
    {
      name: "Hard",
      value: "hard",
    },
  ];

  return (
    <div className="container">
      <h1 className="title text-light">Skill Tracker </h1>
      {/** displaying question  */}

      <div className="radio-buttons-container">
        <select onChange={handleSubjectChange}>
          <option disabled={selectedSubject} value={null}>
            Select a Subject
          </option>
          ;
          {subjects.map((subject, idx) => {
            return (
              <option
                disabled={selectedSubject}
                value={subject.value}
                key={idx}
              >
                {subject.name}
              </option>
            );
          })}
        </select>
      </div>

      {selectedSubject ? (
        <div className="radio-buttons-container">
          <select onChange={handleDifficultyChange}>
            <option disabled={selectedDifficulty} value={null}>
              Select difficulty
            </option>

            {difficulty.map((dif, idx) => {
              return (
                <option
                  disabled={selectedDifficulty}
                  value={dif.value}
                  key={idx}
                >
                  {dif.name}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}

      {selectedSubject && selectedDifficulty ? (
        <>
          <Questions
            onChecked={onChecked}
            selectedSubject={selectedSubject}
            checked={check}
          ></Questions>
          <div className="grid">
            <button
              disabled={trace === 0}
              className="btn prev"
              onClick={onPrev}
            >
              Prev {"<<"}
            </button>
            <button className="btn next" onClick={onNext}>
              {trace >= queue.length - 1 ? "Submit" : "Next"} {">>"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
