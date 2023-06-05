import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LocationContext, ThemeContext } from "../context";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function ChatsScreen() {
  const { currentLocation } = useContext(LocationContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background[1000] }]}
    >
      <Pressable
        onPress={() =>
          navigation.navigate(
            "Chat"
            // , { id: newChatRoom.id }
          )
        }
        style={styles.mapContainer}
      >
        <MapView
          style={styles.map}
          // TODO: NOT currentLocation but SOSer's LOCATION
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          // showsUserLocation={true}
        >
          <Marker coordinate={currentLocation} draggable={true}>
            <Callout>
              <Text>USER's location.</Text>
            </Callout>
          </Marker>
        </MapView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    position: "absolute",
    width: "95%",
    height: "30%",
    top: 0,
    borderRadius: 20,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
