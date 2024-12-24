import { combineReducers } from "@reduxjs/toolkit";
import signInReducer from "./SignIn/signinReducer";
import signUpReducer from "./SignUp/signupReducer";
import GetQuestionsReducer from "./Exam/getQuestionsReducer";
import takeExamReducer from "./Exam/takeExamReducer";
import addExamReducer from "./Exam/addExamReducer";

export const rootReducer = combineReducers({
  signInReducer,
  signUpReducer,
  GetQuestionsReducer,
  takeExamReducer,
  addExamReducer, 
});

export type RootReducer = ReturnType<typeof rootReducer>;
