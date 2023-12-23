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
