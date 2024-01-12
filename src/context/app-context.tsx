import { createContext, useContext } from "react";
import { Prize } from "../models/prize";

interface AppContext {
  prizes: Prize[];
}

const initalState: AppContext = {
  prizes: [],
};

const appContext = createContext<AppContext>(initalState);

export const AppContextProvider = () => {
  return <appContext.Provider value={initalState}></appContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(appContext);

  
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export default AppContextProvider;
