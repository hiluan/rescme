import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  PanResponder,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context";

const StatusScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [isAlerted, setIsAlerted] = useState(false);
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const position = useState(new Animated.Value(0))[0];

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 5,
        duration: 200,
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
      // isAlerted ? null : navigation.navigate("Chats");
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

  ///////////////////////////
  // swipe up to mark safe

  const handleSwipeUp = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      setIsAlerted(false);
    });
  };

  // height of the device's screen
  const screenHeight = Dimensions.get("screen").height;
  const swipeThreshold = screenHeight * 0.35; // Adjust the percentage as needed

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

  const animatedSwipeUpStyles = { transform: [{ translateY: position }] };
  const backgroundColorStyle = {
    backgroundColor: !isAlerted ? theme.redAccent[500] : theme.background[950],
  };
  const colorStyle = {
    color: isAlerted ? theme.redAccent[500] : theme.gray[950],
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isAlerted
            ? theme.redAccent[500]
            : theme.background[950],
        },
      ]}
    >
      {!isAlerted ? (
        <Pressable onPress={animateButton} style={styles.button}>
          <Animated.View
            style={[
              styles.buttonInner,
              backgroundColorStyle,
              {
                opacity: opacityAnimation,
                transform: [{ scale: scaleAnimation }],
              },
            ]}
          >
            <Text style={[styles.buttonText, colorStyle]}>I Need Help!</Text>
          </Animated.View>
        </Pressable>
      ) : (
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.buttonInner,
            backgroundColorStyle,
            animatedSwipeUpStyles,
            {
              opacity: opacityAnimation,
            },
          ]}
        >
          <Text style={[styles.buttonText, colorStyle]}>I'm Safe.</Text>
        </Animated.View>
      )}
      <Text
        style={[
          styles.subtitle,
          { color: !isAlerted ? theme.redAccent[500] : theme.background[950] },
        ]}
      >
        {isAlerted
          ? "Swipe the button up to inform you're safe."
          : "Press the button to inform you need help ASAP."}
      </Text>
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 20,
  },
});
