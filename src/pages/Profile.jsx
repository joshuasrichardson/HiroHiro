import { Pressable, StyleSheet, Text, View, Image } from "react-native";
// import { Context } from "../../App";
// import React, { useContext } from "react";

const Profile = ({ navigation, route }) => {
  // const { user } = useContext(Context);
  const user = route.params;
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/guy.png")} style={styles.image} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{user.firstName + " " + user.lastName}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text>Email: {user.email}</Text>
        <Text>Nationality: {user.nationality}</Text>
        <Text>Native Language: {user.nativeLanguage}</Text>
        <Text>Studying: {user.learningLanguage}</Text>
        <Text>Language Level: {user.languageLevel}</Text>
        <Text>Hobbies:</Text>
        {user.hobbies.map((hobby) => (
          <Text key={hobby}>{hobby}</Text>
        ))}
        <Text>Language Goals:</Text>
        {user.languageGoals.map((goal) => (
          <Text key={goal}>{goal}</Text>
        ))}
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
    height: 250,
  },
  image: {
    width: 200,
    height: 200,
    borderColor: "orange",
    borderWidth: 5,
    borderRadius: 100,
    border: "solid",
  },
  textContainer: {
    display: "flex",
    padding: 30,
    alignItems: "flex-start",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
  },
});
