import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

const StatusScreen = () => {
  const [isAlerted, setIsAlerted] = useState(false);
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 3,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start(() => {
      setIsAlerted(!isAlerted);
      isAlerted ? null : navigation.navigate("Chats");
    });
    // navigation.navigate("Group Info", { id: chatroomID })
    // navigation.navigate("Chats");
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
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isAlerted ? "red" : "white" },
      ]}
    >
      <Pressable onPress={animateButton} style={styles.button}>
        <Animated.View
          style={[
            styles.buttonInner,
            {
              opacity: opacityAnimation,
              backgroundColor: isAlerted ? "white" : "red",
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        >
          <Text>{isAlerted ? "Mark as Safe!" : "Alerted!"}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
});
