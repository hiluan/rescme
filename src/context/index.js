import { LocationContext, LocationProvider } from "./LocationContext";
import { AlertContext, AlertProvider } from "./AlertContext";
import { ThemeContext, ThemeProvider } from "./ThemeContext";

export { LocationContext, AlertContext, ThemeContext };

export function Providers({ children }) {
  return (
    <LocationProvider>
      <AlertProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AlertProvider>
    </LocationProvider>
  );
}
