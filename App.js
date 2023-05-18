import { StyleSheet, View } from "react-native";
import { Providers } from "./src/context";
import { StatusBar } from "expo-status-bar";
import Navigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <Providers>
      <View style={[styles.container]}>
        <Navigator />
        <StatusBar style="auto" />
      </View>
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
