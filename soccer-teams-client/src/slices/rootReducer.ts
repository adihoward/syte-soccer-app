import { combineReducers } from "redux";
import teamsReducer from './teams.slice';

const rootReducer = combineReducers({
    teams: teamsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;