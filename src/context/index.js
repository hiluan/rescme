import { LocationContext, LocationProvider } from "./LocationContext";
import { AlertContext, AlertProvider } from "./AlertContext";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import { ShowHistoryContext, ShowHistoryProvider } from "./ShowHistoryContext";
import { MeContext, MeProvider } from "./MeContext";

export {
  LocationContext,
  AlertContext,
  ThemeContext,
  ShowHistoryContext,
  MeContext,
};

export function Providers({ children }) {
  return (
    <MeProvider>
      <LocationProvider>
        <AlertProvider>
          <ThemeProvider>
            <ShowHistoryProvider>{children}</ShowHistoryProvider>
          </ThemeProvider>
        </AlertProvider>
      </LocationProvider>
    </MeProvider>
  );
}
