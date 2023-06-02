import { createContext, useState } from "react";

export const ShowHistoryContext = createContext();

export const ShowHistoryProvider = ({ children }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <ShowHistoryContext.Provider value={{ showHistory, setShowHistory }}>
      {children}
    </ShowHistoryContext.Provider>
  );
};
