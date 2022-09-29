import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const HHButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    padding: 16,
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "orange",
    borderRadius: 99,
    paddingHorizontal: 8,
  },
});

export default HHButton;
