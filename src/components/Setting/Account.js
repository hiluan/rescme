import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Account = () => {
  return (
    <View style={styles.container}>
      <Text>Delete Account</Text>
    </View>
  );
};

export default Account;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
