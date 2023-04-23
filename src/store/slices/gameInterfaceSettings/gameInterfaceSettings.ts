import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum EClocksInterfaceType {
  line = "line",
  circle = "circle",
}

interface IGameInterfaceState {
  clocks: EClocksInterfaceType;
}

const initialState: IGameInterfaceState = {
  clocks: EClocksInterfaceType.circle,
};

const gameInterfaceSettingsSlice = createSlice({
  name: "gameInterfaceSetting",
  initialState,
  reducers: {
    setInterfaceClocksType: (state, action: PayloadAction<EClocksInterfaceType>) => {
      state.clocks = action.payload;
    },
  },
});

const gameInterfaceSettingsSliceReducer = gameInterfaceSettingsSlice.reducer;

export { gameInterfaceSettingsSliceReducer };

export { EClocksInterfaceType };

export const { setInterfaceClocksType } = gameInterfaceSettingsSlice.actions;
