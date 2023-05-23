// using DIAL PAD
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const KeyboardOff = ({ stylesIcon }) => {
  return (
    <TouchableOpacity
      style={styles.dialPadIcon}
      onPress={() => Keyboard.dismiss()}
    >
      {/* <Text style={dialPadIconText}>⌨</Text> */}
      <MaterialCommunityIcons
        name="keyboard-off"
        style={stylesIcon.dialPadIconText}
      />
      <View style={stylesIcon.dialPadIconTextBackground}></View>
    </TouchableOpacity>
  );
};

const Backspace = ({ stylesIcon, onDeletePress }) => {
  return (
    <TouchableOpacity style={styles.dialPadIcon} onPress={onDeletePress}>
      {/* <Text style={dialPadIconText}>⌨</Text> */}
      <MaterialCommunityIcons
        name="backspace"
        style={stylesIcon.dialPadIconText}
      />
      <View style={stylesIcon.dialPadIconTextBackground}></View>
    </TouchableOpacity>
  );
};

const DialPad = ({ theme, onNumberPress, onDeletePress }) => {
  const stylesIcon = {
    dialPadIconText: {
      fontSize: 32,
      color: theme.gray[750],
    },

    dialPadIconTextBackground: {
      zIndex: -1,
      position: "absolute",
      top: 8,
      width: 20,
      height: 15,
      backgroundColor: "white",
    },
  };

  const dialPad = [
    ["1", "2ABC", "3DEF"],
    ["4GHI", "5JKL", "6MNO"],
    ["7PQRS", "8TUV", "9WXYZ"],
    [
      <KeyboardOff stylesIcon={stylesIcon} />,
      "0+",
      <Backspace onDeletePress={onDeletePress} stylesIcon={stylesIcon} />,
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
              {typeof number === "string" ? (
                <View style={styles.dialPadButtonNumber}>
                  <Text style={styles.dialPadButtonText}>
                    {number.slice(0, 1)}
                  </Text>
                  <Text style={styles.dialPadButtonTextSub}>
                    {number.slice(1)}
                  </Text>
                </View>
              ) : (
                <Text style={styles.dialPadButtonText}>{number}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default DialPad;

const styles = StyleSheet.create({
  dialPadIcon: {
    // padding: 10,
    // marginLeft: 10,
    // borderRadius: 10,
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
    marginVertical: 8,
  },
  dialPadButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  dialPadButtonIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  dialPadButtonNumber: {
    justifyContent: "center",
    alignItems: "center",
  },
  dialPadButtonText: {
    fontSize: 32,
    color: "white",
  },
  dialPadButtonTextSub: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    marginTop: -3,
    letterSpacing: 2,
  },
});
