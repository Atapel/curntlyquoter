"use client";
import React, { createContext, useContext, useReducer } from "react";
// Import Logic
import { initialConfiguration, reducer } from "./ConfigReducer"
import { initialBreaker, breakerReducer } from "./BreakerReducer";
// Create Context
const Curent_User_Context = createContext();
const ConfigurationReducerContext = createContext();
const BreakerReducerContext = createContext();
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
export const UseCurrentUserContext = () => useContext(Curent_User_Context);
export const UseConfigurationReducerContext = () => useContext(ConfigurationReducerContext)
export const UseBreakerReducerContext = () => useContext(BreakerReducerContext)