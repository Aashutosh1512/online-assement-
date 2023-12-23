import React from 'react';
import { useDispatch } from 'react-redux';
import { instructions } from '../constants';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { setUser } from '../application/slice';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setUser(data));
    navigate('/quiz');
  };

  return (
    <div className="flex flex-col bg-prussian_blue-500 h-screen items-center justify-center">
      <div className="bg-sky_blue-500 py-10 px-16 flex flex-col space-y-10  justify-center items-center rounded-lg">
        <h1 className="text-7xl font-bold">Preplaced</h1>

        <div className="space-y-2">
          <h3 className="font-bold text-2xl">Instructions:</h3>
          <ol className="list-disc">
            {instructions.map((instruction, idx) => {
              return <li key={idx}>{instruction}</li>;
            })}
          </ol>
        </div>

        <form
          className="flex flex-col w-full space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-col space-y-1 font-semibold flex w-full">
            <label htmlFor="">NAME:</label>
            <input
              className="w-full rounded-lg p-2"
              type="text"
              {...register('name', {
                required: 'Name should be provided.',
                minLength: {
                  value: 3,
                  message: 'Name must be greater than 3 charechters',
                },
                maxLength: {
                  value: 20,
                  message: 'Name must be less than 20 charechters',
                },
                pattern: {
                  value: /^([a-zA-Z ]){2,30}$/,
                  message: 'Invalid name',
                },
              })}
              placeholder="NAME"
            />
            <ErrorMessage
              render={({ message }) => (
                <p className="text-red-500 text-sm">{message}</p>
              )}
              errors={errors}
              name="name"
            />
          </div>

          <div className="flex-col space-y-1 font-semibold flex w-full">
            <label htmlFor="">EMAIL:</label>
            <input
              className="w-full rounded-lg p-2"
              {...register('email', {
                required: 'Valid email should be provided.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="text"
              placeholder="jhondoe@gmail.com"
            />
            <ErrorMessage
              render={({ message }) => (
                <p className="text-red-500 text-sm">{message}</p>
              )}
              errors={errors}
              name="email"
            />
          </div>

          <button
            className="bg-prussian_blue-500 py-4 px-8 rounded-lg text-white"
            type="submit"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}
