// using KEYBOARD
import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ThemeContext } from "../context";

//TODO: fix the padding, not straight between +1 and 564 556  5656
const ContactEditScreen = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const { contact } = route.params;

  const [number, setNumber] = useState(contact.phone);
  const [name, setName] = useState(contact.name);

  const stylesInputText = {
    color: theme.gray[0],
    borderColor: theme.background[500],
    flex: 1,
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingLeft: 80,
    fontSize: 18,
  };
  const stylesPhoneNotEditable = {
    color: theme.gray[0],
    flex: 1,
    height: 50,
    paddingLeft: 80,
    paddingTop: 12,
    fontSize: 18,
  };
  const background950 = { backgroundColor: theme.background[950] };

  return (
    <View style={[styles.container, background950]}>
      <View style={{ height: 50 }}></View>
      <View style={styles.inputContainer}>
        <View style={[styles.dropdownButton]}>
          <Text style={{ color: theme.gray[0], fontSize: 18 }}>🇺🇸 +1</Text>
        </View>

        <Text style={stylesPhoneNotEditable}>{contact.phone}</Text>
      </View>

      {/* // TODO: if user found then show the below: */}
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.background[900] },
        ]}
      >
        <Text style={[styles.title, { color: theme.gray[300] }]}>Name</Text>
        <TextInput
          placeholder="Enter Contact's Name"
          placeholderTextColor={theme.gray[600]}
          value={name}
          onChangeText={setName}
          style={stylesInputText}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.redAccent[500] }]}
        onPress={() => handleSearchUser(number)}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Delete Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.redAccent[500] }]}
        onPress={() => handleSearchUser(number)}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    borderRadius: 10,
    height: 50,
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // width: "90%",
    // marginTop: 50,
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
