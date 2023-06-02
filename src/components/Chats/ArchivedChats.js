import { View, Text, FlatList } from "react-native";
import React from "react";
import chats from "../../../assets/data/chats.json";
import AChat from "./AChat";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";

const ArchivedChats = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.showArchivesBtn}>
        <Text style={styles.title}>Archived Situations</Text>
      </Pressable>
      <FlatList data={chats} renderItem={({ item }) => <AChat chat={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    width: "100%",
    // marginTop: 50,
  },
  showArchivesBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    alignSelf: "center",
    backgroundColor: "gray",
    width: "50%",
    borderRadius: 5,
  },
});

export default ArchivedChats;
