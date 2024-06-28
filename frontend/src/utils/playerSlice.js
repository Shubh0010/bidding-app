import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    allPlayers: [],
    currentPlayer: {}
  },
  reducers: {
    addPlayers: (state, action) => {
      state.allPlayers = action.payload;
    },
    removePlayers: (state, action) => {
      state.allPlayers = [];
    },
    addCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload;
    },
    removeCurrentPlayer: (state, action) => {
      state.currentPlayer = {};
    }
  }
});

export const { addPlayers, removePlayers, addCurrentPlayer, removeCurrentPlayer } = playerSlice.actions;

export default playerSlice.reducer;