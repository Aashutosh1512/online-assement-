import React, { useEffect } from 'react';
import ResultTable from './result-table.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectResult, selectUser } from '../application/selectors';
import { useNavigate } from 'react-router-dom';
import { resetQuiz } from '../application/slice';

export default function Result() {
  const dispatch = useDispatch();
  const result = useSelector(selectResult);

  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const restart = () => {
    dispatch(resetQuiz());
    navigate('/quiz');
  };

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="h-screen w-full grid grid-cols-3 p-10 gap-10 bg-prussian_blue-500">
      <div className="flex items-center col-span-1 flex-col space-y-10 rounded-lg shadow-lg bg-sky_blue-500 ">
        <div className="w-full p-6 text-xl">
          <div className="flex items-center space-x-2">
            <span className="font-bold">Name: </span>
            <span className="bold"> {result.user.name} </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">Email:</span>
            <span className="bold"> {result.user.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">Total Points:</span>
            <span className="bold"> {result.totalPoints}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">Total Attempts:</span>
            <span className="bold"> {result.questionsAttempted}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">Total Earned Points:</span>
            <span className="bold"> {result.points}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold">Result:</span>
            <span className=""> {result.achived}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={restart}
          className="relative rounded px-5 py-2.5 overflow-hidden group bg-prussian_blue-500 hover:bg-gradient-to-r hover:from-prussian_blue-500 hover:to-prussian_blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-prussian_blue-400 transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Restart</span>
        </button>
      </div>

      <div className="col-span-2 w-full mx-auto">
        <ResultTable />
      </div>
    </div>
  );
}
