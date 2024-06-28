import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: 'team',
  initialState: {
    current_session: {}
  },
  reducers: {
    addCurrentSession: (state, action) => {
      state.current_session = action.payload;
    },
    removeCurrentSession: (state, action) => {
      state.current_session = {};
    }
  }
});

export const { addCurrentSession, removeCurrentSession } = sessionSlice.actions;

export default sessionSlice.reducer;