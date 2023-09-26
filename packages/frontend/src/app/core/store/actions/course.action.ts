import { createAction, props } from "@ngrx/store";
import { User } from "firebase/auth";

export const fetch = createAction("fetch", props<{ loading: boolean }>());
export const addUser = createAction("addUser", props<{ user: User | null }>());
