import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const quizReducer = createSlice({
  name: 'quiz',
  initialState: {
    questions: null,
    question: null,
    questionsLoading: false,
    storeResultLoading: false,
    questionIndex: 0,
    answers: [],
    result: null,
  },
  reducers: {
    setSelectedSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },

    setSelectedDifficulty: (state, action) => {
      state.selectedDifficulty = action.payload;
    },

    nextQuestion: (state, action) => {
      state.questionIndex = Math.min(
        state.questionIndex + 1,
        state.questions.length - 1
      );

      state.question = state.questions[state.questionIndex];
    },

    setAnswer: (state, action) => {
      state.answers[action.payload.id] = action.payload.answer - '0';
    },

    resetQuiz: (state, action) => {
      state.answers = [];
      state.question = null;
      state.questions = null;
      state.questionsLoading = false;
      state.storeResultLoading = false;
      state.questionIndex = 0;
      state.answers = [];
      state.result = null;
    },

    previousQuestion: (state, action) => {
      state.questionIndex = Math.max(state.questionIndex - 1, 0);
      state.question = state.questions[state.questionIndex];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.questionsLoading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questionsLoading = false;
        state.questions = action.payload;
        state.question = action.payload[0];
        state.answers = new Array(action.payload.length).fill(-1);
      });

    builder
      .addCase(storeResult.pending, (state) => {
        state.storeResultLoading = true;
      })
      .addCase(storeResult.fulfilled, (state, action) => {
        state.storeResultLoading = false;
        state.result = action.payload;
      });
  },
});

export const selectQuestion = (state) => {
  return state.quiz.question;
};

export const selectAnswers = (state) => {
  return state.quiz.answers;
};

export const selectQuestionIndex = (state) => {
  return state.quiz.questionIndex;
};

export const selectQuestionsLoading = (state) => {
  return state.quiz.questionsLoading;
};

export const selectStoreResultLoading = (state) => {
  return state.quiz.storeResultLoading;
};

export const selectResult = (state) => {
  return state.quiz.result;
};

export const selectTotalQuestions = (state) => {
  return state.quiz.questions.length;
};

export const {
  setSelectedSubject,
  setSelectedDifficulty,
  nextQuestion,
  previousQuestion,
  setAnswer,
  resetQuiz,
} = quizReducer.actions;

export default quizReducer.reducer;
