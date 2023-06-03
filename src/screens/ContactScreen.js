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

//TODO: ONLY EDIT NAME
const ContactScreen = () => {
  const { theme } = useContext(ThemeContext);
  const background950 = { backgroundColor: theme.background[950] };
  const [number, setNumber] = useState("");
  const [numberOnly, setNumberOnly] = useState("");
  const [name, setName] = useState("");
  const [existingUser, setExistingUser] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle the dropdown
  const dropdownRef = useRef(null); // Reference to the dropdown view

  const stylesInputText = {
    flex: 1,
    height: 50,
    fontSize: 18,
    paddingLeft: 80,
    color: theme.gray[0],
    borderColor: theme.background[500],
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
    // alignItems: "center",
    // justifyContent: "center",
  };

  return (
    <View style={[styles.container, background950]}>
      <View style={{ height: 50 }}></View>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.background[900] },
        ]}
      >
        <View
          style={[
            styles.dropdownButton,
            { backgroundColor: theme.background[500] },
          ]}
        >
          <Text style={{ color: "white", fontSize: 18 }}>🇺🇸 +1</Text>
        </View>

        <Text style={stylesInputText}>(408) 515-5444</Text>
      </View>

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.background[900] },
        ]}
      >
        <Text style={[styles.title, { color: theme.gray[300] }]}>Name</Text>

        <Text style={stylesInputText}>Contact's Name</Text>
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
    // alignSelf: "center",
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
