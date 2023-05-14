import { View, StyleSheet, Text } from "react-native";
import { Account, ThemesToggle } from "../components/Setting";
import { ThemeContext } from "../context";
import { useContext } from "react";

const SettingScreen = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background[950] }]}
    >
      <Text style={[styles.title, { color: theme.gray[300] }]}>Theme</Text>
      <ThemesToggle />
      <Text style={[styles.subtitle, { color: theme.gray[300] }]}>
        Choose the theme for the app.
      </Text>
      <Text style={[styles.title, { color: theme.gray[300] }]}>Account</Text>
      <Account theme={theme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    margin: 16,
    marginLeft: 24,
  },
  subtitle: {
    margin: 8,
    marginLeft: 24,
  },
});

export default SettingScreen;
