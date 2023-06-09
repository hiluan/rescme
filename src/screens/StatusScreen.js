import { View, Text, StyleSheet } from "react-native";
import React from "react";

const StatusScreen = () => {
  return (
    <View style={styles.container}>
      <Text>StatusScreen</Text>
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
