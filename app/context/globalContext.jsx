"use client";
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

const Configuration_Frame_Context = createContext();
const Configuration_Breakers_Context = createContext();
const Items_Lenght_Check_Context = createContext();
const User_Input_Context = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [Selected_Panel, set_Selected_Panel] = useState([]);
  const [Selected_Breakers, setSelected_Breakers] = useState([]);
  const [Length_Limit_Check, setLength_Limit_Check] = useState(0);
  const [User_Input, setUser_Input] = useState({
    client: "",
    project: "",
    equipment: "-",
    salesOrderNumber: "-",
    revision: "-",
    drawingDate: "",
    drawnBy: "",
  });

  return (
    <>
      <Configuration_Frame_Context.Provider
        value={{ Selected_Panel, set_Selected_Panel }}
      >
        <Items_Lenght_Check_Context.Provider
          value={{ Length_Limit_Check, setLength_Limit_Check }}
        >
          <User_Input_Context.Provider value={{ User_Input, setUser_Input }}>
            <Configuration_Breakers_Context.Provider
              value={{ Selected_Breakers, setSelected_Breakers }}
            >
              {children}
            </Configuration_Breakers_Context.Provider>
          </User_Input_Context.Provider>
        </Items_Lenght_Check_Context.Provider>
      </Configuration_Frame_Context.Provider>
    </>
  );
};

// export const UseGlobalContext = () => useContext()
export const UseFrameContext = () => useContext(Configuration_Frame_Context);
export const UseBreakerContext = () =>
  useContext(Configuration_Breakers_Context);
export const UseUserInputContext = () => useContext(User_Input_Context);
export const UseLenghtLimitContext = () =>
  useContext(Items_Lenght_Check_Context);
