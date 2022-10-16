import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
// import { Context } from "../../App";
import React, { useState } from "react";
import ServerFacade from "../api/ServerFacade";
import HHField from "../components/HHField";

const Profile = ({ navigation, route }) => {
  // const { user } = useContext(Context);
  const user = route.params;
  const [nationality, setNationality] = useState(user.nationality);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/guy.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {user.firstName + " " + user.lastName}
          </Text>
        </View>
        <View contentContainerStyle={styles.textContainer}>
          <Text style={styles.header}>Email:</Text>
          <Text style={styles.text}>{user.email}</Text>
          <HHField
            header="Nationality"
            value={nationality}
            setValue={setNationality}
            saveData={ServerFacade.setNationality}
            user={user}
          ></HHField>
          <Text style={styles.header}>Native Language:</Text>
          <Text style={styles.text}>{user.nativeLanguage}</Text>
          <Text style={styles.header}>Studying:</Text>
          <Text style={styles.text}>{user.learningLanguage}</Text>
          <Text style={styles.header}>Language Level:</Text>
          <Text style={styles.text}>{user.languageLevel}</Text>
          <Text style={styles.header}>Hobbies:</Text>
          {user.hobbies.map((hobby) => (
            <Text key={hobby} style={styles.text}>
              {hobby}
            </Text>
          ))}
          <Text style={styles.header}>Language Goals:</Text>
          {user.languageGoals.map((goal) => (
            <Text key={goal} style={styles.text}>
              {goal}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: "100%",
  },
  image: {
    width: "90%",
    height: "100%",
    borderColor: "orange",
    borderWidth: 5,
    borderRadius: 20,
    border: "solid",
  },
  outerContainer: {
    flex: 1,
  },
  textContainer: {
    display: "flex",
    padding: 30,
    alignItems: "flex-start",
  },
  scrollContainer: {
    display: "flex",
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: 10,
    paddingTop: 25,
  },
  text: {
    fontSize: "20px",
    padding: 10,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 20,
  },
  editButton: {},
});
