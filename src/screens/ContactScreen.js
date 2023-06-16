// using KEYBOARD
import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ThemeContext } from "../context";

//TODO: fix the padding, not straight between +1 and 564 556  5656

const ContactScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { contact } = route.params;

  const stylesInputText = {
    flex: 1,
    height: 50,
    fontSize: 18,
    paddingLeft: 80,
    color: theme.gray[0],
    borderColor: theme.background[500],
    paddingTop: 12,
    // alignItems: "center",
    // justifyContent: "center",
  };
  const background950 = { backgroundColor: theme.background[950] };

  return (
    <View style={[styles.container, background950]}>
      <View style={{ height: 50 }}></View>
      <View
        style={[
          styles.inputContainer,
          // { backgroundColor: theme.background[900] },
        ]}
      >
        <View style={[styles.dropdownButton]}>
          <Text style={{ color: theme.gray[0], fontSize: 18 }}>🇺🇸 +1</Text>
        </View>

        <Text style={stylesInputText}>{contact.phone}</Text>
      </View>

      <View
        style={[
          styles.inputContainer,
          // { backgroundColor: theme.background[900] },
        ]}
      >
        <Text style={[styles.title, { color: theme.gray[300] }]}>Name</Text>

        <Text style={stylesInputText}>{contact.name}</Text>
      </View>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownButton: {
    position: "absolute",
    borderRadius: 10,
    left: 10,
    height: 30,
    width: 60,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  title: {
    position: "absolute",
    left: 10,
    fontSize: 18,
    marginRight: 10,
  },
});
