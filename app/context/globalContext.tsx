"use client";
import React, { createContext, useContext, useReducer } from "react";
import {TConfiguration,TConfigurationActions} from "./types"
// Import Logic
import { initialConfiguration, reducer } from "./ConfigReducer"
import { initialBreaker, breakerReducer } from "./BreakerReducer";
// Create Context
interface ConfigurationContextType {
  state: TConfiguration;
  dispatch: React.Dispatch<TConfigurationActions>;
}
const ConfigurationReducerContext = createContext<ConfigurationContextType>({ state: initialConfiguration, dispatch: () => {} });
const BreakerReducerContext = createContext({ state: initialBreaker, dispatch: () => {} });
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
export const UseConfigurationReducerContext = () => useContext(ConfigurationReducerContext)
export const UseBreakerReducerContext = () => useContext(BreakerReducerContext)