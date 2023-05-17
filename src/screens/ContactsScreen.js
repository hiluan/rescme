import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context";

const ContactsScreen = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColorStyle = { backgroundColor: theme.background[950] };
  const colorStyle = { color: theme.gray[950] };

  return (
    <View style={[styles.container, backgroundColorStyle]}>
      <Text>ContactsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
});

export default ContactsScreen;
