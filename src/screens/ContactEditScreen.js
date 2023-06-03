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

//TODO: ONLY EDIT NAME
const ContactEditScreen = () => {
  const { theme } = useContext(ThemeContext);
  const background950 = { backgroundColor: theme.background[950] };
  const [number, setNumber] = useState("");
  const [numberOnly, setNumberOnly] = useState("");
  const [name, setName] = useState("");
  const [existingUser, setExistingUser] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle the dropdown
  const dropdownRef = useRef(null); // Reference to the dropdown view

  useEffect(() => {
    const showNumber = (num) => {
      const numberOnly = num.replace(/[^0-9]/g, "");
      //TODO: when numberOnly.length === 10 => automatically search for the user in the DB without having to press search
      // if the user is not in the db => send invitation
      // if the user is in the db => button 'add user' appears

      if (numberOnly.length === 10) {
        console.log("Loading user...");
        return;
      }
      let formattedNumber = "";

      // if numberWithoutAlphabets.length === 3 => add () => (304)
      // if numberWithoutAlphabets.length === 4 => add ' ' => (304) 444
      // if numberWithoutAlphabets.length === 7 => add - => (304) 444-5465

      if (numberOnly.length > 6) {
        formattedNumber = `(${numberOnly.slice(0, 3)}) ${numberOnly.slice(
          3,
          6
        )}-${numberOnly.slice(6)}`;
      } else if (numberOnly.length > 3) {
        formattedNumber = `(${numberOnly.slice(0, 3)}) ${numberOnly.slice(3)}`;
      } else {
        formattedNumber = numberOnly;
      }

      if (formattedNumber !== number) {
        setNumber(formattedNumber);
      }
    };

    showNumber(number);
  }, [number]);

  const handleSearchUser = (number) => {
    const numberWithoutAlphabets = number.replace(/[^0-9]/g, "");
    console.log("| --------- numberWithoutAlphabets:", numberWithoutAlphabets);

    // Format the numbers in the desired format
    const formattedNumber = numberWithoutAlphabets.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "($1) $2-$3"
    );
    console.log("| --------- formattedNumber:", formattedNumber);
    console.log("| --------- name:", name);
    if (numberWithoutAlphabets.length !== 10)
      return console.warn("Please enter a valid phone number.");

    // Update the state with the formatted number
    setNumber(formattedNumber);
    //     setDropdownOpen(false);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleDropdownPress = () => {
    // setDropdownOpen(!dropdownOpen);
  };

  const handleNumberPress = (digit) => {
    const numberOnly = number.replace(/[^0-9]/g, "");
    if (numberOnly.length <= 10) {
      setNumber((prevNumber) => prevNumber.replace(/[^0-9]/g, "") + digit);
    }
  };

  const handleDeletePress = () => {
    setNumber((prevNumber) => prevNumber.slice(0, prevNumber.length - 1));
  };

  const stylesInputText = {
    color: theme.gray[0],
    borderColor: theme.background[500],
    flex: 1,
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 80,
    fontSize: 18,
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={[styles.container, background950]}>
        <View style={{ height: 50 }}></View>
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.background[900] },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              { backgroundColor: theme.background[500] },
            ]}
            onPress={handleDropdownPress}
          >
            <Text style={{ color: "white", fontSize: 18 }}>🇺🇸 +1</Text>
          </TouchableOpacity>
          {dropdownOpen && (
            <View
              ref={dropdownRef}
              style={styles.dropdownOptions}
              onStartShouldSetResponder={() => true}
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.dropdownOption,
                    { backgroundColor: theme.redAccent[500] },
                  ]}
                  onPress={() => handleSearchUser(option.value)}
                >
                  <Text style={{ color: "white" }}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TextInput
            placeholder="Enter Contact's Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor={theme.gray[600]}
            value={number}
            onChangeText={(text) => {
              // let user input only 10 digits (for USA)
              const numberOnly = text.replace(/[^0-9]/g, "");
              if (numberOnly.length === 11) {
                return;
              }
              setNumber(text);
            }}
            style={[
              stylesInputText,
              { borderTopWidth: StyleSheet.hairlineWidth },
            ]}
          />
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
          <Text style={{ color: "white", fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    alignSelf: "center",
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
  dropdownOptions: {
    position: "absolute",
    top: 40,
    left: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  dropdownOption: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    position: "absolute",
    left: 10,
    fontSize: 18,
    marginRight: 10,
  },
});
