import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestions, storeResult } from '../thunks';

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

export const {
  setSelectedSubject,
  setSelectedDifficulty,
  nextQuestion,
  previousQuestion,
  setAnswer,
  resetQuiz,
} = quizReducer.actions;

export default quizReducer.reducer;
