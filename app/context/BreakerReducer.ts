import {TInitialBreaker, TBreakerActions} from "./types"
export const initialBreaker: TInitialBreaker = {
    // User Selecions
    SelectedSize: "Select Breaker Size",
    SelectedTrip: "Select Breaker Trip",
    SelectedFeature: "Select Feature",
    SelectedBreaker: { Description: "Select Breaker" },
    SelectedBreakerAmp: "Select Amperage",
    SelectedBreakerPoles: "Select Poles",
    // Technical Specs
    BreakerSize: null,
    MaxAmp: null
};

export const breakerReducer = (
    state: TInitialBreaker, 
    action: TBreakerActions
) => {
    switch (action.type) {

        case "RESET_BREAKER_STATE":
            return initialBreaker;

        case "SET_SELECTED_SIZE":
            return { ...state, SelectedSize: action.payload };

        case "SET_SELECTED_TRIP":
            return { ...state, SelectedTrip: action.payload };

        case "SET_SELECTED_FEATURE":
            return { ...state, SelectedFeature: action.payload };

        case "SET_SELECTED_BREAKER":
            return { 
                ...state, 
                SelectedBreaker: action.payload,
                Name: action.payload['Description'],
                MaxAmp: action.payload['Max_Amperage'],
                BreakerSize: action.payload['Size']
            };

        case "SET_SELECTED_BREAKER_AMP":
            return { ...state, SelectedBreakerAmp: action.payload };

        case "SET_SELECTED_BREAKER_POLES":
            return { ...state, SelectedBreakerPoles: action.payload };

        default:
            return state;
    }
};