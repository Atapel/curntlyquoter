"use client";
import React, { createContext, useContext, useReducer } from "react";
import {
  TConfigurationState,
  TConfigurationActions,
  TInitialBreaker,
  TBreakerActions
} from "./types"
// Import Logic
import { initialConfiguration, reducer } from "./ConfigReducer"
import { initialBreaker, breakerReducer } from "./BreakerReducer";
// Create Context
interface ConfigurationContextType {
  state: TConfigurationState;
  dispatch: React.Dispatch<TConfigurationActions>;
}
interface BreakerContextType {
  breakerState: TInitialBreaker;
  dispatch: React.Dispatch<TBreakerActions>;
}
const ConfigurationReducerContext = createContext<ConfigurationContextType>({ 
  state: initialConfiguration, 
  dispatch: () => {} 
});

const BreakerReducerContext = createContext({ 
  state: initialBreaker,
  dispatch: () => {} 
});

// Export the global Context Provider
export const GlobalContextProvider = ({ children }) => {
  // Create the Context Variabless
  const [state, dispatch] = useReducer(reducer, initialConfiguration);
  const [breakerState, breakerDispatch] = useReducer(breakerReducer, initialBreaker);
  return (
    <>
      <ConfigurationReducerContext.Provider
        value={{ state, dispatch }}
      >
        <BreakerReducerContext.Provider
          value={{ breakerState, breakerDispatch }}>
            {children}
        </BreakerReducerContext.Provider>
      </ConfigurationReducerContext.Provider>
    </>
  );
};
// Export the Context Consumers
export const UseConfigurationReducerContext = ():ConfigurationContextType => useContext(ConfigurationReducerContext)
export const UseBreakerReducerContext = ():BreakerContextType => useContext(BreakerReducerContext)