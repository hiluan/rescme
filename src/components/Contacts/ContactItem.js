import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";
import React from "react";

const ContactItem = ({ user, theme, onPress = () => {} }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.content,
          {
            borderBottomColor: theme.background[600],
          },
        ]}
      >
        <Text style={[styles.name, { color: theme.gray[0] }]} numberOfLines={1}>
          {user.name}
        </Text>
        <Text
          style={[styles.phone, { color: theme.gray[200] }]}
          numberOfLines={2}
        >
          {user.phone}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontSize: 24,
    // fontWeight: "bold",
  },
  phone: {
    fontSize: 16,
  },
});

export default ContactItem;
