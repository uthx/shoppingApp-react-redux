import { reducer } from "./ducks/catalouge";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  reducer,
});

export default rootReducer;
