import React from "react";
import { View, StyleSheet } from "react-native";

const HHView = ({ children }) => {
  return <View style={styles.view}>{children}</View>;
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
});

export default HHView;
