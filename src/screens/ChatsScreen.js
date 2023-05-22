import {
  View,
  Text,
  PanResponder,
  Button,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useContext, useRef } from "react";
import { ThemeContext } from "../context";

const ChatsScreen = () => {
  const { theme } = useContext(ThemeContext);
  // const backgroundColorStyle = { backgroundColor: theme.background[950] };
  // const colorStyle = { color: theme.gray[950] };

  const position = new Animated.Value(0);

  const handleSwipeUp = () => {
    console.log("hello");
  };

  // const panResponder = React.useMemo(() => {
  //   return PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderRelease: (_, gestureState) => {
  //       if (gestureState.dy < -200) {
  //         handleSwipeUp();
  //       } else {
  //         Animated.spring(position, {
  //           toValue: 0,
  //           useNativeDriver: true,
  //         }).start();
  //       }
  //     },
  //     onPanResponderMove: Animated.event([null, { dy: position }], {
  //       useNativeDriver: false,
  //     }),
  //   });
  // }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -200) {
          handleSwipeUp();
        } else {
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderMove: Animated.event([null, { dy: position }], {
        useNativeDriver: false,
      }),
    })
  ).current;

  const animatedStyles = {
    transform: [{ translateY: position }],
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background[950] }]}
    >
      <Animated.Text
        {...panResponder.panHandlers}
        style={[styles.text, animatedStyles]}
      >
        Swipe Up
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
});

export default ChatsScreen;

// import React, { useEffect, useState } from "react";
// import { StyleSheet, Dimensions } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Geolocation from "react-native-geolocation-service";

// // npm install react-native-maps react-native-geolocation-service @react-native-community/masked-view @react-navigation/native @react-navigation/stack
// // expo install expo-location

// const MapScreen = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     // Get current location
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCurrentLocation({ latitude, longitude });
//       },
//       (error) => {
//         console.log("Error getting current location:", error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   }, []);

//   return (
//     <MapView
//       style={styles.map}
//       initialRegion={{
//         latitude: currentLocation?.latitude || 0,
//         longitude: currentLocation?.longitude || 0,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }}
//       showsUserLocation={true}
//       followsUserLocation={true}
//     >
//       {currentLocation && (
//         <Marker
//           coordinate={{
//             latitude: currentLocation.latitude,
//             longitude: currentLocation.longitude,
//           }}
//           title="You are here"
//         />
//       )}
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

// export default MapScreen;
