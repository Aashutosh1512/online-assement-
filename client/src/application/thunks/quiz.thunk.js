import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async ({ subject, difficulty }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions?subject=${subject}&difficulty=${difficulty}`
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const storeResult = createAsyncThunk(
  'quiz/storeResult',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const user = state.user.user;
    const answers = state.quiz.answers;
    const questions = state.quiz.questions;

    let points = 0;
    let questionsAttempted = 0;
    let totalPoints = 10 * questions.length;

    for (let i = 0; i < answers.length; i++) {
      const element = answers[i];
      if (element !== -1) {
        if (element === questions[i].answer[0]) {
          points += 10;
        }
        questionsAttempted++;
      }
    }

    let achived = totalPoints * 0.5 > points ? 'FAIL' : 'PASS';

    const result = {
      user,
      questionsAttempted,
      achived,
      points,
      totalPoints,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
        result
      );

      return result;
    } catch (err) {
      throw err;
    }
  }
);
