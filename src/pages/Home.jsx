import React from "react";
import HHButton from "../components/HHButton";
import HHView from "../components/HHView";
import { Text, View, StyleSheet, Image } from "react-native";

const Home = ({ navigation }) => {
  return (
    <HHView>
      <Image
        source={require("../../assets/hirohiro.png")}
        alt="Hiro Hiro Logo"
        style={styles.image}
      />
      <Text style={styles.text}>
        Enjoy learning another culture through visiting a foreign country,
        hosting a foreign visitor, or speaking with foreign friends online!
      </Text>
      <View style={styles.flexRow}>
        <View style={styles.buttonContainer}>
          <HHButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          <HHButton
            title="Get Started"
            onPress={() => navigation.navigate("Register")}
            style={styles.button}
          />
        </View>
      </View>
    </HHView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "28%",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
  },
  button: {
    width: "100%",
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});

export default Home;
