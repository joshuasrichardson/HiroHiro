import { Pressable, StyleSheet, Text } from "react-native";
// import { Context } from "../../App";
// import React, { useContext } from "react";

const Profile = ({ navigation, route }) => {
  // const { user } = useContext(Context);
  return (
    <Text>This is {route.params.name || route.params.email}'s profile.</Text>
  );
};

export default Profile;
