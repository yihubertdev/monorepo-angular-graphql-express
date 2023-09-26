import { State, createReducer, on } from "@ngrx/store";
import { addUser, fetch } from "../actions/course.action";
import { User } from "firebase/auth";

const initialState: User[] = [];

export const counterReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => {
    return {
      ...state,
      user,
    };
  }),
  on(fetch, (state, payload) => {
    return {
      ...state,
      loading: true,
    };
  })
);
