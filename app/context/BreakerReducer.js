export const initialBreaker = {
    Selected_Size: "Select Breaker Size",
    SelectedTrip: "Select Breaker Trip",
    SelectedFeature: "Select Feature",
    Selected_Breaker: { Description: "Select Breaker" },
    SelectedBreakerAmp: "Select Amperage",
    SelectedBreakerPoles: "Select Poles",
};

export const breakerReducer = (state, action) => {
    switch (action.type) {
        case SET_SELECTED_SIZE:
            return { ...state, Selected_Size: action.payload };
        case SET_SELECTED_TRIP:
            return { ...state, SelectedTrip: action.payload };
        case SET_SELECTED_FEATURE:
            return { ...state, SelectedFeature: action.payload };
        case SET_SELECTED_BREAKER:
            return { ...state, Selected_Breaker: action.payload };
        case SET_SELECTED_BREAKER_AMP:
            return { ...state, SelectedBreakerAmp: action.payload };
        case SET_SELECTED_BREAKER_POLES:
            return { ...state, SelectedBreakerPoles: action.payload };
        default:
            return state;
    }
};