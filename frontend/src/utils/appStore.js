import { configureStore } from "@reduxjs/toolkit";
import sessonReducer from "./sessionSlice";

const appStore = configureStore({
  reducer: {
    session: sessonReducer
  }
});

export default appStore;