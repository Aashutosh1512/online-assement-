import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//
import { getServerData } from "../helper/helper";

import * as Action from "../redux/queston_reducer";
//fetch question hook to fetch api data and set value to store
export const useFetchQestion = () => {
  const dispatch = useDispatch();

  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  const selectedSubject = useSelector((state) => state.quiz.selectedSubject);
  const selectedDifficulty = useSelector(
    (state) => state.quiz.selectedDifficulty
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions?subject=${selectedSubject}&difficulty=${selectedDifficulty}`,
          (data) => data
        );

        const answers = [];
        questions.forEach((question) => {
          answers.push(question.answer[0]);
        });

        console.log(questions, answers);

        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: { questions, answers } }));

          /** dipatch an action*/
          dispatch(Action.startExamAction({ question: questions, answers }));
        } else {
          throw new Error("No Question Avalibale");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, isLoading: error }));
      }
    };

    if (selectedSubject && selectedDifficulty ) {
      setGetData((prev) => ({ ...prev, isLoading: true }));
      fetchQuestions();
    }
  }, [dispatch, selectedSubject, selectedDifficulty]);

  return [getData, setGetData];
};

export const moveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};
export const movePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};
