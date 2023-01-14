import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { primaryOrange } from "../styles";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryOrange,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default HHButton;
