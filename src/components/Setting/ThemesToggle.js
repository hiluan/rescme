import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { darkTheme, lightTheme } from "../../theme";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context";
import { Ionicons } from "@expo/vector-icons";

const ThemesToggle = () => {
  const { setTheme, systemTheme } = useContext(ThemeContext);
  const [selectedText, setSelectedText] = useState("System");

  const handleThemeChange = (selectedMode, text) => {
    setTheme(selectedMode);
    setSelectedText(text);
  };

  const renderRadioButton = (text) => {
    const isSelected = selectedText === text;
    const themeIcon =
      text === "Light"
        ? "md-sunny"
        : text === "Dark"
        ? "md-moon"
        : "stop-circle";

    const selectedTheme =
      text === "Dark" ? darkTheme : text === "Light" ? lightTheme : systemTheme;

    return (
      <TouchableOpacity
        style={styles.radioButton}
        onPress={() => handleThemeChange(selectedTheme, text)}
      >
        <View style={styles.radioLeft}>
          <Ionicons name={themeIcon} size={24} color="black" />
          <Text style={styles.radioText}>{text}</Text>
        </View>
        <View style={[styles.radioRight]}>
          <Ionicons
            name={
              isSelected
                ? "ios-radio-button-on-outline"
                : "ios-radio-button-off-outline"
            }
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme</Text>
      {renderRadioButton("System")}
      {renderRadioButton("Light")}
      {renderRadioButton("Dark")}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  radioLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    fontSize: 16,
    marginLeft: 12,
  },
});

export default ThemesToggle;
