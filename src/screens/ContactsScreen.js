import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { ContactItem, contacts } from "../components/Contacts";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const ContactsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const backgroundColor950 = { backgroundColor: theme.background[950] };

  return (
    <View style={[styles.container, backgroundColor950]}>
      <Pressable
        onPress={() => navigation.navigate("Contact Add")}
        style={[styles.addButton]}
      >
        <Text style={[styles.addText, { color: theme.gray[100] }]}>
          New Contact
        </Text>
        <View
          style={[
            styles.addIcon,
            {
              backgroundColor: theme.background[100],
            },
          ]}
        >
          <Ionicons name="add" size={24} color={theme.gray[950]} />
        </View>
      </Pressable>

      <FlatList
        style={styles.contactsContainer}
        data={contacts.sort((a, b) => a.name.localeCompare(b.name))}
        renderItem={({ item }) => (
          <ContactItem
            user={item}
            theme={theme}
            onPress={() => navigation.navigate("Contact", { id: item.phone })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  addButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 20,
    position: "absolute", // Position the Add button at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure the button appears above the FlatList
  },
  addIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    marginLeft: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  addText: { fontSize: 16 },
  contactsContainer: {
    marginTop: 60,
  },
});

export default ContactsScreen;
