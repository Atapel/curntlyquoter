"use client";
import React, { createContext, useContext, useState, useReducer } from "react";
// Import Logic
import { initialConfiguration, reducer } from "./ConfigReducer"
// Create Context
const Curent_User_Context = createContext();
const ConfigurationReducerContext = createContext();
// Export the global Context Provider
export const GlobalContextProvider = ({ children }) => {
  // Create the Context Variabless
  const [state, dispatch] = useReducer(reducer, initialConfiguration);
  const [CurrentUser, setCurrentUser] = useState(false);
  return (
    <>
      <ConfigurationReducerContext.Provider
        value={{ state, dispatch }}
      >
        <Curent_User_Context.Provider
          value={{ CurrentUser, setCurrentUser }}
        >
          {children}
        </Curent_User_Context.Provider>
      </ConfigurationReducerContext.Provider>
    </>
  );
};
// Export the Context Consumers
export const UseCurrentUserContext = () => useContext(Curent_User_Context);
export const UseConfigurationReducerContext = () => useContext(ConfigurationReducerContext)