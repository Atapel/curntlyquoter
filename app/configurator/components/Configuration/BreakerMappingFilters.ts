import {
  UseConfigurationReducerContext,
  UseBreakerReducerContext,
} from "@context/globalContext";
import { TSelectedBreaker } from "@/app/context/types";
const { state, dispatch } = UseConfigurationReducerContext();
const { breakerState, breakerDispatch } = UseBreakerReducerContext();
export const filterByWidthandHeight = (breaker: TSelectedBreaker) => {
  return (
    breaker.BreakerWidth === state.Configuration.SelectedFrameSize &&
    breaker.BreakerHeight === breakerState.SelectedHeight
  );
};
export const filterByBreakerSize = (breaker: TSelectedBreaker) => {
  // Making sure that all breakers that can be selected are bellow the Max breaker size
  if (
    breaker.Size + state.Configuration.CurrentBreakersSize <=
    state.Configuration.MaxBreakerSize
  ) {
    return true;
  }
  return false;
};
