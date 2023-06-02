import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { AContact, contacts } from "../components/Contacts";
import { useNavigation } from "@react-navigation/core";
import { ThemeContext } from "../context";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";

const ContactsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const background950 = { backgroundColor: theme.background[1000] };

  return (
    <View style={[styles.container, background950]}>
      <Pressable
        onPress={() => navigation.navigate("Add Contact")}
        style={[styles.addButton]}
      >
        {/* <Text style={[styles.addText, { color: theme.gray[100] }]}>
          New Contact
        </Text> */}
        <View
          style={[
            styles.addIcon,
            {
              backgroundColor: theme.redAccent[500],
            },
          ]}
        >
          <Ionicons name="person-add" size={24} color={theme.gray[950]} />
        </View>
      </Pressable>

      <FlatList
        style={styles.contactsContainer}
        data={contacts.sort((a, b) => a.name.localeCompare(b.name))}
        renderItem={({ item }) => (
          <AContact
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
  container: { flex: 1, width: "100%" },
  addButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 20,
    position: "absolute", // Position the Add button at the top
    bottom: 30,
    left: 0,
    right: 10,
    zIndex: 1, // Ensure the button appears above the FlatList
  },
  addIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 20,
    overflow: "hidden",
  },
  addText: { fontSize: 16 },
  contactsContainer: {
    // marginTop: 80,
  },
});

export default ContactsScreen;
