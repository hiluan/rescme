import { createContext, useState, useEffect } from "react";
import { darkTheme, lightTheme } from "../theme";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const systemTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  const [theme, setTheme] = useState(systemTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
