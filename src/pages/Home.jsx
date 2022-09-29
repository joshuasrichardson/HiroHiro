import React from "react";
import HHButton from "../components/HHButton";
import HHView from "../components/HHView";
import { Text } from "react-native";

const Home = ({ navigation }) => {
  return (
    <HHView>
      <Text>
        Welcome to Hirohiro, where you can learn a language and culture from
        native speakers!
      </Text>
      <HHButton title="Login" onPress={() => navigation.navigate("Login")} />
      <HHButton
        title="Get Started"
        onPress={() => navigation.navigate("Register")}
      />
    </HHView>
  );
};

export default Home;
