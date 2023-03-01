import React, { useState, useEffect } from "react";
import { Animated } from "react-native";

const SlideDownOnExit = ({ open, children }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (open) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 8,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          },
        ],
        width: "100%",
        height: "100%",
        margin: 0,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default SlideDownOnExit;
