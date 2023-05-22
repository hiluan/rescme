// using DIAL PAD
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
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DialPad = ({ theme, onNumberPress, onDeletePress }) => {
  const dialPadIconText = {
    fontSize: 48,
    color: theme.gray[750],
  };

  const dialPad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [
      <KeyboardOff dialPadIconText={dialPadIconText} />,
      "0",
      <Backspace
        onDeletePress={onDeletePress}
        dialPadIconText={dialPadIconText}
      />,
    ],
  ];

  return (
    <View style={styles.dialPadContainer}>
      {dialPad.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.dialPadRow}>
          {row.map((number, i) => (
            <TouchableOpacity
              key={i}
              style={
                typeof number === "string"
                  ? [
                      styles.dialPadButton,
                      { backgroundColor: theme.background[750] },
                    ]
                  : styles.dialPadButtonIcon
              }
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.dialPadButtonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const KeyboardOff = ({ dialPadIconText }) => {
  return (
    <TouchableOpacity
      style={styles.dialPadIcon}
      onPress={() => Keyboard.dismiss()}
    >
      {/* <Text style={dialPadIconText}>⌨</Text> */}
      <MaterialCommunityIcons name="keyboard-off" style={dialPadIconText} />
    </TouchableOpacity>
  );
};

const Backspace = ({ dialPadIconText, onDeletePress }) => {
  return (
    <TouchableOpacity style={styles.dialPadIcon} onPress={onDeletePress}>
      {/* <Text style={dialPadIconText}>⌨</Text> */}
      <MaterialCommunityIcons name="backspace" style={dialPadIconText} />
    </TouchableOpacity>
  );
};

const ContactAddScreen = () => {
  const { theme } = useContext(ThemeContext);
  const background950 = { backgroundColor: theme.background[950] };
  const [number, setNumber] = useState("");
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

    if (numberWithoutAlphabets.length !== 10)
      return console.warn("Please enter a valid phone number.");

    // Update the state with the formatted number
    setNumber(formattedNumber);
    //     setDropdownOpen(false);
  };

  const options = [
    { label: "🇺🇸 +1", value: "+1" },
    { label: "🇩🇪 +49", value: "+49" },
    { label: "🇫🇷 +33", value: "+33" },
    // Add more options here
  ];

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleDropdownPress = () => {
    // setDropdownOpen(!dropdownOpen);
  };

  const handleNumberPress = (digit) => {
    const numberOnly = number.replace(/[^0-9]/g, "");

    if (numberOnly.length < 10) {
      setNumber((prevNumber) => prevNumber.replace(/[^0-9]/g, "") + digit);
    }
  };

  const handleDeletePress = () => {
    setNumber((prevNumber) => prevNumber.slice(0, prevNumber.length - 1));
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={[styles.container, background950]}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              { backgroundColor: theme.redAccent[500] },
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

          <View style={styles.inputTextContainer}>
            {number.length ? (
              <TextInput
                //   placeholder="Enter Phone Number"
                //   placeholderTextColor={theme.gray[600]}
                value={number}
                onChangeText={setNumber}
                style={[
                  styles.inputText,
                  {
                    color: theme.gray[100],
                  },
                ]}
              />
            ) : (
              <Text
                style={[
                  styles.inputText,
                  {
                    color: theme.gray[750],
                    fontSize: 16,
                  },
                ]}
              >
                Enter a Phone Number
              </Text>
            )}
          </View>
        </View>

        <DialPad
          theme={theme}
          onNumberPress={handleNumberPress}
          onDeletePress={handleDeletePress}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.redAccent[500] }]}
          onPress={() => handleSearchUser(number)}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Search User</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactAddScreen;

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
    width: "90%",
    marginVertical: 20,
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
  inputTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  inputText: {
    flex: 1,
    paddingLeft: 80,
    fontSize: 32,
  },
  dialPadIcon: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    // backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },

  dialPadContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  dialPadRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  dialPadButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    // backgroundColor: "gray",
  },
  dialPadButtonIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    width: 80,
    height: 80,
    borderRadius: 40,
    // backgroundColor: "gray",
  },
  dialPadButtonText: {
    fontSize: 32,
    color: "white",
  },
});

// using KEYBOARD
// import React, { useState, useContext, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import { ThemeContext } from "../context";

// const ContactAddScreen = () => {
//   const { theme } = useContext(ThemeContext);
//   const background950 = { backgroundColor: theme.background[950] };

//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");
//   const [existingUser, setExistingUser] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle the dropdown
//   const dropdownRef = useRef(null); // Reference to the dropdown view

//   const handleSearchUser = (selectedOption) => {
//     setNumber(selectedOption);
//     setDropdownOpen(false);
//   };

//   const options = [
//     { label: "🇺🇸 +1", value: "+1" },
//     { label: "🇩🇪 +49", value: "+49" },
//     { label: "🇫🇷 +33", value: "+33" },
//     // Add more options here
//   ];

//   const closeDropdown = () => {
//     setDropdownOpen(false);
//   };

//   const handleDropdownPress = () => {
//     // setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <TouchableWithoutFeedback onPress={closeDropdown}>
//       <View style={[styles.container, background950]}>
//         <View style={styles.inputContainer}>
//           <TouchableOpacity
//             style={[
//               styles.dropdownButton,
//               { backgroundColor: theme.redAccent[500] },
//             ]}
//             onPress={handleDropdownPress}
//           >
//             <Text style={{ color: "white", fontSize: 18 }}>🇺🇸 +1</Text>
//           </TouchableOpacity>

//           {dropdownOpen && (
//             <View
//               ref={dropdownRef}
//               style={styles.dropdownOptions}
//               onStartShouldSetResponder={() => true}
//             >
//               {options.map((option) => (
//                 <TouchableOpacity
//                   key={option.value}
//                   style={[
//                     styles.dropdownOption,
//                     { backgroundColor: theme.redAccent[500] },
//                   ]}
//                   onPress={() => handleSearchUser(option.value)}
//                 >
//                   <Text style={{ color: "white" }}>{option.label}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}

//           <TextInput
//             placeholder="Enter Phone Number"
//             placeholderTextColor={theme.gray[600]}
//             value={number}
//             onChangeText={setNumber}
//             style={[
//               styles.inputText,
//               { color: theme.gray[100], borderColor: theme.redAccent[500] },
//             ]}
//           />
//         </View>

//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: theme.redAccent[500] }]}
//           onPress={() => handleSearchUser(number)}
//         >
//           <Text style={{ color: "white", fontSize: 18 }}>Search User</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default ContactAddScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   button: {
//     borderRadius: 10,
//     height: 50,
//     width: "90%",
//     marginTop: 20,
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "center",
//     width: "90%",
//     marginTop: 50,
//   },
//   dropdownButton: {
//     position: "absolute",
//     borderRadius: 10,
//     left: 10,
//     // borderBottomLeftRadius: 10,
//     // borderTopLeftRadius: 10,
//     height: 30,
//     width: 60,
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//   },
//   dropdownOptions: {
//     position: "absolute",
//     top: 40,
//     left: 0,
//     width: "100%",
//     paddingHorizontal: 10,
//     paddingTop: 10,
//     backgroundColor: "white",
//     flexDirection: "column",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "gray",
//   },
//   dropdownOption: {
//     height: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   inputText: {
//     flex: 1,
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 80,
//     fontSize: 18,
//   },
// });

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
/////////////////////// OLD
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Modal,
// } from "react-native";
// import { useState, useContext } from "react";
// import { ThemeContext } from "../context";

// const ContactAddScreen = () => {
//   const { theme } = useContext(ThemeContext);
//   const background950 = { backgroundColor: theme.background[950] };

//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");
//   const [existingUser, setExistingUser] = useState(false);
//   const [showOptions, setShowOptions] = useState(false); // State to toggle the options modal

//   const handleSearchUser = (number) => {
//     const numberWithoutAlphabets = number.replace(/[^0-9]/g, "");
//     console.log("| --------- numberWithoutAlphabets:", numberWithoutAlphabets);

//     // Format the numbers in the desired format
//     const formattedNumber = numberWithoutAlphabets.replace(
//       /(\d{3})(\d{3})(\d{4})/,
//       "($1) $2-$3"
//     );
//     console.log("| --------- formattedNumber:", formattedNumber);

//     if (numberWithoutAlphabets.length !== 10)
//       return console.warn("Please enter a valid phone number.");

//     // Update the state with the formatted number
//     setNumber(formattedNumber);
//   };

//   return (
//     <View style={[styles.container, background950]}>
//       <View style={styles.inputContainer}>
//         <TouchableOpacity
//           style={[
//             styles.smallButton,
//             { backgroundColor: theme.redAccent[500] },
//           ]}
//           onPress={() => setShowOptions(true)}
//         >
//           <Text style={{ color: "white" }}>🇺🇸 +1</Text>
//         </TouchableOpacity>

//         <TextInput
//           placeholder="Enter Phone Number"
//           placeholderTextColor={theme.gray[600]}
//           value={number} // Bind the number state to the TextInput's value
//           onChangeText={(txt) => {
//             // Remove non-numeric characters from the input using regular expressions
//             //   const numericInput = txt.replace(/[^\d]/g, "");
//             setNumber(txt); // Update the name state with the numeric input
//           }}
//           style={[
//             styles.inputText,
//             { color: theme.gray[100], borderColor: theme.redAccent[500] },
//           ]}
//         />
//       </View>

//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: theme.redAccent[500] }]}
//         onPress={() => handleSearchUser(number)}
//       >
//         <Text style={{ color: "white" }}>Search User</Text>
//       </TouchableOpacity>

//       {/* Options modal */}
//       <Modal visible={showOptions} animationType="slide">
//         <View style={[styles.container, background950]}>
//           {/* Close button */}
//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: theme.redAccent[500] }]}
//             onPress={() => setShowOptions(false)}
//           >
//             <Text style={{ color: "white" }}>Close</Text>
//           </TouchableOpacity>

//           {/* Options */}
//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: theme.redAccent[500] }]}
//             onPress={() => {
//               handleSearchUser("+49"); // Update the number state with the selected option
//               setShowOptions(false); // Close the options modal
//             }}
//           >
//             <Text style={{ color: "white" }}>🇩🇪 +49</Text>
//           </TouchableOpacity>
//           {/* Add more options here */}
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ContactAddScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   button: {
//     borderRadius: 10,
//     height: 50,
//     width: "90%",
//     marginTop: 20,
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   smallButton: {
//     borderRadius: 5,
//     height: 30,
//     width: 60,
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "center",
//     width: "90%",
//     marginTop: 50,
//   },
//   inputText: {
//     flex: 1,
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 15,
//   },
// });
