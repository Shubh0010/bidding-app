import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    allTeams: []
  },
  reducers: {
    addteam: (state, action) => {
      state.allTeams = action.payload;
    },
    removeteam: (state, action) => {
      state.allTeams = {};
    }
  }
});

export const { addteam, removeteam } = teamSlice.actions;

export default teamSlice.reducer;