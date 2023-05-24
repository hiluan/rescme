import React, { useContext, useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { LocationContext } from "../context";

export default function ChatsScreen() {
  // const { currentLocation, setCurrentLocation } = useContext(LocationContext);
  // console.log(
  //   "| ----------------------------- currentLocation:",
  //   currentLocation.coords.latitude
  // );

  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={currentLocation}
          title="Test Title"
          description="Test Description"
        >
          <Callout>
            <Text>My current location.</Text>
          </Callout>
        </Marker>
      </MapView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
