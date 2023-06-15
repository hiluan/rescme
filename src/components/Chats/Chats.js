import { View, Text, FlatList } from "react-native";
import React from "react";
import chats from "../../../assets/data/chats.json";
import AChat from "./AChat";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";

const Chats = ({ bg, theme }) => {
  return (
    <View style={[styles.container, bg]}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <AChat chat={item} theme={theme} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Chats;
