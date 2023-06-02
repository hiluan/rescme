import { LocationContext, LocationProvider } from "./LocationContext";
import { AlertContext, AlertProvider } from "./AlertContext";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import { ShowHistoryContext, ShowHistoryProvider } from "./ShowHistoryContext";

export { LocationContext, AlertContext, ThemeContext, ShowHistoryContext };

export function Providers({ children }) {
  return (
    <LocationProvider>
      <AlertProvider>
        <ThemeProvider>
          <ShowHistoryProvider>{children}</ShowHistoryProvider>
        </ThemeProvider>
      </AlertProvider>
    </LocationProvider>
  );
}
