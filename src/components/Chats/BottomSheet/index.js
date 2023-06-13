import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ThemeContext } from "../../../context";
import { WINDOW_HEIGHT } from "../../../utils";

const MAX_TRANSLATE_Y = -WINDOW_HEIGHT + 50; // max height of the bottom sheet

const BottomSheet = React.forwardRef(({ children }, ref) => {
  const { theme } = useContext(ThemeContext);
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination) => {
    "worklet";
    active.value = destination !== 0;
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  //   const scrollTo = useCallback((destinationPercentage) => {
  //     "worklet";
  //     active.value = destinationPercentage !== 0;
  //     const destination = destinationPercentage * MAX_TRANSLATE_Y;
  //     translateY.value = withSpring(destination, { damping: 50 });
  //   }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive,
  ]);

  const context = useSharedValue({ y: 0 });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = event.translationY + ctx.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    },
    onEnd: () => {
      if (translateY.value > -WINDOW_HEIGHT / 3) {
        scrollTo(0);
      } else if (translateY.value < -WINDOW_HEIGHT / 1.5) {
        // bottom sheet moves to max height if press over this point
        scrollTo(MAX_TRANSLATE_Y);

        // scrollTo(0.5); // Move to half of the screen
      }
    },
  });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      //   [25, 5], // borderRadius = 5 when bottomSheet at max height
      [25, 25],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  const rBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active.value ? 1 : 0),
    };
  }, []);

  const rBackdropProps = useAnimatedProps(() => {
    return {
      pointerEvents: active.value ? "auto" : "none",
    };
  }, []);

  return (
    <>
      <Animated.View
        onTouchStart={() => {
          // Dismiss the BottomSheet
          scrollTo(0);
        }}
        animatedProps={rBackdropProps}
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.4)", // shadow with opacity
          },
          rBackdropStyle,
        ]}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: WINDOW_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: WINDOW_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
