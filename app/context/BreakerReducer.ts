import { TInitialBreaker, TBreakerActions } from "./types";
export const initialBreaker: TInitialBreaker = {
  // User Selecions
  SelectedHeight: null,
  SelectedTrip: null,
  SelectedFeature: null,
  SelectedBreaker: null,
  SelectedBreakerAmp: null,
  SelectedBreakerPoles: null,
  Name: null,
  // Technical Specs
  BreakerDisplayName: null,
  BreakerSize: null,
  MaxAmp: null,
};
export const breakerReducer = (
  state: TInitialBreaker,
  action: TBreakerActions
) => {
  switch (action.type) {
    case "RESET_BREAKER_STATE":
      return initialBreaker;

    case "SET_SELECTED_SIZE":
      return {
        ...state,
        SelectedHeight: action.payload,
      };

    case "SET_SELECTED_TRIP":
      return {
        ...state,
        SelectedTrip: action.payload,
      };

    case "SET_SELECTED_FEATURE":
      return {
        ...state,
        SelectedFeature: action.payload,
      };

    case "SET_SELECTED_BREAKER":
      return {
        ...state,

        SelectedBreaker: action.payload,
        Name: action.payload["Description"],
        MaxAmp: action.payload["Max_Amperage"],
        BreakerSize: action.payload["Size"],
      };

    case "SET_SELECTED_BREAKER_AMP":
      return {
        ...state,
        SelectedBreakerAmp: action.payload,
      };

    case "SET_SELECTED_BREAKER_POLES":
      return {
        ...state,
        SelectedBreakerPoles: action.payload,
      };

    default:
      return state;
  }
};
