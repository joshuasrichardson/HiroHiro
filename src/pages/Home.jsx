import React from "react";
import HHButton from "../components/HHButton";
import HHView from "../components/HHView";
import { Text, View, StyleSheet } from "react-native";

const Home = ({ navigation }) => {
  return (
    <HHView>
      <Text>
        Welcome to Hirohiro, where you can learn a language and culture from
        native speakers!
      </Text>
      <View style={styles.flexRow}>
        <HHButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        />
        <HHButton
          title="Get Started"
          onPress={() => navigation.navigate("Register")}
          style={styles.button}
        />
      </View>
    </HHView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
  },
});

export default Home;
