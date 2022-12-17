import { RootState } from "../../store";

export const selectClocksInterfaceType = (state: RootState) => state.gameInterfaceSetting.clocks;