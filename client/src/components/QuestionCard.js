import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextQuestion,
  previousQuestion,
  selectAnswers,
  selectQuestionIndex,
  selectStoreResultLoading,
  selectTotalQuestions,
  setAnswer,
  storeResult,
} from '../redux/quiz.slice';

const QuestionCard = ({ question }) => {
  const questionIndex = useSelector(selectQuestionIndex);
  const questionsLength = useSelector(selectTotalQuestions);
  const storeResultLoading = useSelector(selectStoreResultLoading);
  const dispatch = useDispatch();

  const answers = useSelector(selectAnswers);

  const handleChange = (e) => {
    dispatch(
      setAnswer({
        id: questionIndex,
        answer: e.target.value,
      })
    );
  };

  const navigate = useNavigate();

  const handleNext = async () => {
    if (questionIndex === questionsLength - 1) {
      await dispatch(storeResult()).unwrap();
      navigate('/result');
    } else {
      dispatch(nextQuestion());
    }
  };

  return (
    <div className="w-5/6">
      <div className="flex flex-col items-start w-full">
        <h4 className="text-xl text-black/60">
          Question {questionIndex + 1} of {questionsLength}
        </h4>
        <div className="mt-4 text-2xl font-bold text-black">
          {question.question}
        </div>
      </div>
      <div className="flex flex-col w-full">
        {question.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-black/90"
          >
            <input
              type="radio"
              value={index}
              checked={answers[questionIndex] === index}
              onChange={handleChange}
              className="w-6 h-6 bg-black"
            />
            <p className="ml-6 text-white">{option}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full mt-4 text-white">
        <button
          onClick={() => dispatch(previousQuestion())}
          className="w-[49%] py-3 bg-prussian_blue-500 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={storeResultLoading}
          className="w-[49%] py-3 bg-prussian_blue-500 rounded-lg disabled:animate-pulse"
        >
          {questionIndex === questionsLength - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
