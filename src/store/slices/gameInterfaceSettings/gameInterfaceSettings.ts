import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EClocksInterfaceType {
  line = 'line',
  circle = 'circle',
}
interface IGameInterfaceState {
  clocks: EClocksInterfaceType;
}

const initialState: IGameInterfaceState = {
  clocks: EClocksInterfaceType.circle,
};

const gameInterfaceSettingsSlice = createSlice({
  name: 'gameInterfaceSetting',
  initialState,
  reducers: {
    setInterfaceClocksType: (state, action: PayloadAction<EClocksInterfaceType>) => {
      state.clocks = action.payload;
    },
  },
});

export default gameInterfaceSettingsSlice.reducer;

export const { setInterfaceClocksType } = gameInterfaceSettingsSlice.actions;
