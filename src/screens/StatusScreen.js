import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context";

const StatusScreen = () => {
  const { theme } = useContext(ThemeContext); // Access the theme
  const [isAlerted, setIsAlerted] = useState(false);
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 5,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start(() => {
      setIsAlerted(!isAlerted);
      // isAlerted ? null : navigation.navigate("Chats");
    });
    // navigation.navigate("Group Info", { id: chatroomID })
    navigation.navigate("Chats");
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
        { backgroundColor: isAlerted ? "red" : theme.backgroundColor },
      ]}
    >
      <Pressable onPress={animateButton} style={styles.button}>
        <Animated.View
          style={[
            styles.buttonInner,
            {
              opacity: opacityAnimation,
              backgroundColor: isAlerted ? theme.backgroundColor : "red",
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        >
          <Text
            style={[styles.buttonText, { color: isAlerted ? "red" : "white" }]}
          >
            {isAlerted ? "Mark as Safe!" : "Alert!"}
          </Text>
        </Animated.View>
      </Pressable>
      <Text style={[styles.subtitle, { color: isAlerted ? "white" : "red" }]}>
        {isAlerted
          ? "Let your RescMe contacts know you're safe."
          : "Let your RescMe contacts know you're in danger."}
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
  buttonText: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 20,
  },
});
