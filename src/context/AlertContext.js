import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [isAlerted, setIsAlerted] = useState(false);

  return (
    <AlertContext.Provider value={{ isAlerted, setIsAlerted }}>
      {children}
    </AlertContext.Provider>
  );
};
