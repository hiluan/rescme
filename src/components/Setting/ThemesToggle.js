import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { darkTheme, lightTheme } from "../../theme";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context";
import { Ionicons } from "@expo/vector-icons";

const ThemesToggle = () => {
  const { theme, setTheme, systemTheme } = useContext(ThemeContext);
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
        : "ios-contrast";

    const selectedTheme =
      text === "Dark" ? darkTheme : text === "Light" ? lightTheme : systemTheme;

    return (
      <TouchableOpacity
        style={styles.radioButton}
        onPress={() => handleThemeChange(selectedTheme, text)}
      >
        <View style={styles.radioLeft}>
          <Ionicons name={themeIcon} size={24} color={theme.gray[300]} />
          <Text style={[styles.radioText, { color: theme.gray[100] }]}>
            {text}
          </Text>
        </View>
        <View style={styles.radioRight}>
          <Ionicons
            name={
              isSelected
                ? "ios-radio-button-on-outline"
                : "ios-radio-button-off-outline"
            }
            size={24}
            color={theme.gray[300]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.table,
          {
            borderColor: theme.background[400],
            backgroundColor: theme.background[1000],
          },
        ]}
      >
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>{renderRadioButton("System")}</View>
        </View>
        <View
          style={[styles.separator, { borderBottomColor: theme.gray[600] }]}
        />
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>{renderRadioButton("Light")}</View>
        </View>
        <View
          style={[styles.separator, { borderBottomColor: theme.gray[600] }]}
        />
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>{renderRadioButton("Dark")}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
  },
  title: {
    marginBottom: 16,
  },
  table: {
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: "hidden", // Ensure border radius is applied to the table
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 14,
  },
  radioButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    fontSize: 16,
    marginLeft: 12,
  },
  radioRight: {
    marginLeft: 8,
  },
  separator: {
    borderWidth: 0.4,
  },
});

export default ThemesToggle;
