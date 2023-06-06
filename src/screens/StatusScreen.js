import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  PanResponder,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AlertContext, LocationContext, ThemeContext } from "../context";
import { useState, useEffect, useRef, useContext } from "react";
import MapView, { Callout, Marker } from "react-native-maps";

import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import { FontAwesome } from "@expo/vector-icons";

const Status = () => {
  const { theme } = useContext(ThemeContext);
  const { isAlerted, setIsAlerted } = useContext(AlertContext);
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const position = useState(new Animated.Value(0))[0];

  const scaleAnimationBtn = () => {
    Haptics.selectionAsync();
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 0.6,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      // scale back to original size
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start(() => {
      setIsAlerted(true);
      isAlerted ? null : navigation.navigate("Situation");
      // navigation.navigate("Group Info", { id: chatroomID })
    });
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnimation, {
          toValue: 0.7,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ])
    ).start();
  }, [, isAlerted]);

  // const handleSwipeUp = () => {
  //   setIsAlerted(false);
  //   Animated.spring(position, {
  //     toValue: 0,
  //     useNativeDriver: true,
  //   }).start();
  // };

  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  // swipe up to mark safe

  const handleSwipeUp = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      Haptics.selectionAsync();
      setIsAlerted(false);
    });
  };

  // height of the device's screen
  const screenHeight = Dimensions.get("screen").height;
  const swipeThreshold = screenHeight * 0.36; // Adjust the percentage as needed

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        // swipe up to this position
        if (gestureState.dy < -swipeThreshold) {
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

  // const animatedSwipeUpStyles = {
  //   transform: [{ translateY: position }],
  //   opacity: position.interpolate({
  //     inputRange: [0, -swipeThreshold],
  //     outputRange: [1, 0],
  //     extrapolate: "clamp",
  //   }),
  // };

  const animatedSwipeUpStyles = {
    transform: [{ translateY: position }],
    opacity: position.interpolate({
      inputRange: [-swipeThreshold, -50],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const backgroundColorMainBtn = {
    backgroundColor: !isAlerted ? theme.redAccent[500] : theme.background[500],
  };
  const colorMainBtn = {
    color: isAlerted ? theme.greenAccent[500] : "white",
  };

  //////////////////////////////////////////////////////
  ////////////////////////////////////////////////////// map

  /// show current location
  const { currentLocation, setCurrentLocation } = useContext(LocationContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Update the map view when currentLocation changes
  useEffect(() => {
    if (currentLocation.latitude && currentLocation.longitude) {
      // Update the map view region with the currentLocation
      mapViewRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    }
  }, [currentLocation]);

  const mapViewRef = useRef(null); // Reference to the MapView component

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background[1000] }]}
    >
      {/* //TODO: create button to go back to chat && send update current location */}
      {/* {isMe && (
        <TouchableOpacity
          onPress={openLocation}
          activeOpacity={0.7}
        ></TouchableOpacity>
      )} */}

      <View style={styles.mapContainer}>
        {currentLocation.latitude && currentLocation.longitude ? (
          <MapView
            ref={mapViewRef}
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }}
          >
            <Marker coordinate={currentLocation} draggable={true}>
              <Callout>
                <Text>Drag to your desired location.</Text>
              </Callout>
            </Marker>
          </MapView>
        ) : (
          <ActivityIndicator size="large" color={theme.gray[0]} />
        )}
      </View>
      {!isAlerted ? (
        <Pressable onPress={scaleAnimationBtn} style={styles.mainBtnContainer}>
          <View
            style={[backgroundColorMainBtn, styles.mainBtnInnerLayer]}
          ></View>
          <Animated.View
            style={[
              styles.mainBtn,
              styles.mainBtnSOS,
              backgroundColorMainBtn,
              {
                opacity: opacityAnimation,
                transform: [{ scale: scaleAnimation }],
              },
            ]}
          >
            <Text style={[styles.mainBtnText, colorMainBtn]}>Send SOS!</Text>
          </Animated.View>
        </Pressable>
      ) : (
        <View style={styles.mainBtnContainer}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.mainBtn,
              styles.mainBtnSafe,
              backgroundColorMainBtn,
              animatedSwipeUpStyles,
              {
                borderColor: theme.greenAccent[500],
              },
            ]}
          >
            <FontAwesome
              name="angle-double-up"
              size={96}
              style={[colorMainBtn, styles.slideUpIcon]}
            />

            <Text style={[colorMainBtn, styles.mainBtnText]}>Confirm</Text>
            <Text style={[colorMainBtn, styles.mainBtnText, { marginTop: -5 }]}>
              Safe
            </Text>
            <Text style={[colorMainBtn, styles.slideUpText]}>Slide Up</Text>
          </Animated.View>
        </View>
      )}
      {/* <Text
        style={[
          styles.subtitle,
          { color: !isAlerted ? theme.redAccent[500] : theme.background[950] },
        ]}
      >
        {isAlerted
          ? "Swipe the button up to inform you're safe."
          : "Press the button to inform you need help ASAP."}
      </Text> */}
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  mapContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "110%", // hide google/apple logo at the bottom
  },
  // map: {
  //   position: "absolute",
  //   width: "100%",
  //   height: "100%",
  //   borderRadius: 20,
  //   overflow: "hidden",
  // },
  mainBtnContainer: {
    width: 180,
    height: 180,
    marginTop: 360,
    // backgroundColor: "white",
    borderRadius: 90,
  },
  mainBtn: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 360,
  },
  mainBtnSOS: {
    shadowColor: "red",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: Platform.OS === "android" ? 5 : undefined, // Add elevation for Android
  },
  mainBtnSafe: {
    // opacity: opacityAnimation,
    borderWidth: 8,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: Platform.OS === "android" ? 5 : undefined, // Add elevation for Android
  },
  mainBtnText: {
    fontSize: 30,
  },
  mainBtnInnerLayer: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.5,
  },
  slideUpText: {
    position: "absolute",
    bottom: 20,
    fontSize: 14,
  },
  slideUpIcon: {
    position: "absolute",
    top: -20,
    transform: [{ scaleX: 1 }, { scaleY: 0.5 }],
  },
  subtitle: {
    fontSize: 13,
    marginTop: 20,
  },
});
