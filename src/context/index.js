import { ThemeContext, ThemeProvider } from "./ThemeContext";
import { AlertContext, AlertProvider } from "./AlertContext";
export { ThemeContext, AlertContext };

export function Providers({ children }) {
  return (
    <AlertProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AlertProvider>
  );
}
