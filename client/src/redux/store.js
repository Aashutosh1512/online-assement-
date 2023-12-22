import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** call reducer */
import quizReducer from './quiz.slice';
import userReducer from './user.slice';

const rootReducer = combineReducers({
  quiz: quizReducer,
  user: userReducer,
});
//create store with reducer
export default configureStore({ reducer: rootReducer });
