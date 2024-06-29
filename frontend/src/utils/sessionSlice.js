import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: 'team',
  initialState: {
    current_session: {}
  },
  reducers: {
    addCurrentSession: (state, action) => {
      state.current_session = action.payload;
      state.player_sold = false;
    },
    removeCurrentSession: (state, action) => {
      state.current_session = {};
      state.player_sold = true;
    }
  }
});

export const { addCurrentSession, removeCurrentSession } = sessionSlice.actions;

export default sessionSlice.reducer;