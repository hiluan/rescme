import React, { useContext } from "react";
import { Account, ThemesToggle } from "../components/Setting";
import { View, StyleSheet } from "react-native";

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <ThemesToggle />
      <Account />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default SettingScreen;
