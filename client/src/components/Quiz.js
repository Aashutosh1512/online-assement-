import React, { useEffect } from 'react';
//redux store import
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchQuestions,
  selectQuestionsLoading,
  selectQuestion,
} from '../redux/quiz.slice';

import { useForm } from 'react-hook-form';
import subjects from '../constants/subject';
import difficulties from '../constants/difficulties';
import { selectUser } from '../redux/user.slice';
import QuestionCard from './QuestionCard';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(fetchQuestions(data));
  };

  const question = useSelector(selectQuestion);
  const questionsLoading = useSelector(selectQuestionsLoading);

  const subject = watch('subject');

  const user = useSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="bg-prussian_blue-500 space-y-6 p-10 w-full h-screen">
      <header className="bg-sky_blue-500 flex justify-between items-center w-full rounded-lg p-4">
        <h3 className="text-2xl font-bold">
          {subjects.find((sub) => sub.value === subject)?.name} Quiz
        </h3>

        <div className="flex items-center space-x-2">
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
            alt={user?.name}
            className="h-10 w-10 rounded-full overflow-hidden"
          />
          <div className="flex-col">
            <p className="font-bold">{user?.name}</p>
            <p className="text-sm text-gray-700">{user?.email}</p>
          </div>
        </div>
      </header>

      <div className="bg-sky_blue-500 h-5/6 flex justify-center flex-col space-y-6 items-center w-full rounded-lg p-4">
        {questionsLoading ? (
          <div className="">Loading...</div>
        ) : question ? (
          <QuestionCard question={question} />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-80 items-center space-y-8"
          >
            <select {...register('subject')} className="p-2 rounded-lg w-full">
              {subjects.map((subject, idx) => {
                return (
                  <option value={subject.value} key={idx}>
                    {subject.name}
                  </option>
                );
              })}
            </select>

            <select
              {...register('difficulty')}
              className="p-2 rounded-lg w-full"
            >
              {difficulties.map((difficulty, idx) => {
                return (
                  <option value={difficulty.value} key={idx}>
                    {difficulty.name}
                  </option>
                );
              })}
            </select>

            <button
              type="submit"
              className="relative rounded px-5 py-2.5 overflow-hidden group bg-prussian_blue-500 hover:bg-gradient-to-r hover:from-prussian_blue-500 hover:to-prussian_blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-prussian_blue-400 transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Start Quiz</span>
            </button>
          </form>
        )}
      </div>

      {/* {selectedSubject && selectedDifficulty ? (
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
              Prev {'<<'}
            </button>
            <button className="btn next" onClick={onNext}>
              {trace >= queue.length - 1 ? 'Submit' : 'Next'} {'>>'}
            </button>
          </div>
        </>
      ) : null} */}
    </div>
  );
}
