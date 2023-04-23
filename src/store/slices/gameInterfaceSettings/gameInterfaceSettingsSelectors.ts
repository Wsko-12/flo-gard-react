import { RootState } from "../../store";

const selectClocksInterfaceType = (state: RootState) => state.gameInterfaceSetting.clocks;

export { selectClocksInterfaceType };
