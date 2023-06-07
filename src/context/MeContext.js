import { createContext, useState } from "react";

export const MeContext = createContext();

export const MeProvider = ({ children }) => {
  const [isMe, setIsMe] = useState(false);

  return (
    <MeContext.Provider value={{ isMe, setIsMe }}>
      {children}
    </MeContext.Provider>
  );
};
