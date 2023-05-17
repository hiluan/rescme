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
