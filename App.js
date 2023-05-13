import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ThemeProvider } from "./src/context/ThemeContext"; // Import the ThemeProvider

import Navigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <View style={[styles.container]}>
        <Navigator />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
