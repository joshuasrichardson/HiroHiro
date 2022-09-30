import { Pressable, StyleSheet, Text, View, Image } from "react-native";
// import { Context } from "../../App";
// import React, { useContext } from "react";

const Profile = ({ navigation, route }) => {
  // const { user } = useContext(Context);
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/JoshuaSan.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>
          This is{" "}
          {route.params.name + " " + route.params.lastName ||
            route.params.email}
          's profile.
        </Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "orange",
    borderWidth: 1,
    border: "solid",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
