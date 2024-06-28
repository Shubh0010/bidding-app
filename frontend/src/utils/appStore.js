import { configureStore } from "@reduxjs/toolkit";
import playeReducer from './playerSlice';
import sessonReducer from "./sessionSlice";
import teamReducer from './teamSlice';

const appStore = configureStore({
  reducer: {
    player: playeReducer,
    team: teamReducer,
    session: sessonReducer
  }
});

export default appStore;