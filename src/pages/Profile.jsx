import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { AppContext } from "../../App";
import React, { useState, useContext } from "react";
import HHField from "../components/HHField";
import HHListField from "../components/HHListField";

const Profile = ({ navigation, route }) => {
  const { user } = useContext(AppContext);
  const { profileUser } = route.params;

  console.log("user", user);
  console.log("profileUser", profileUser);
  const [nationality, setNationality] = useState(profileUser.nationality);
  const [nativeLanguage, setNativeLanguage] = useState(
    profileUser.nativeLanguage
  );
  const [learningLanguage, setLearningLanguage] = useState(
    profileUser.learningLanguage
  );
  const [languageLevel, setLanguageLevel] = useState(profileUser.languageLevel);
  const [hobbies, setHobbies] = useState(profileUser.hobbies);
  const [languageGoals, setLanguageGoals] = useState(profileUser.languageGoals);

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
            {profileUser.firstName + " " + profileUser.lastName}
          </Text>
        </View>
        <View contentContainerStyle={styles.textContainer}>
          <Text style={styles.header}>Email:</Text>
          <Text style={styles.text}>{profileUser.email}</Text>
          <Text style={styles.header}>Nationality:</Text>
          <HHField
            value={nationality}
            setValue={setNationality}
            attribute="nationality"
            canEdit={user.id === profileUser.id}
          />
          <Text style={styles.header}>Native Language:</Text>
          <HHField
            value={nativeLanguage}
            setValue={setNativeLanguage}
            attribute="nativeLanguage"
            canEdit={user.id === profileUser.id}
          />
          <Text style={styles.header}>Studying:</Text>
          <HHField
            value={learningLanguage}
            setValue={setLearningLanguage}
            attribute="learningLanguage"
            canEdit={user.id === profileUser.id}
          />
          <Text style={styles.header}>Language Level:</Text>
          <HHField
            value={languageLevel}
            setValue={setLanguageLevel}
            attribute="languageLevel"
            canEdit={user.id === profileUser.id}
          />
          <Text style={styles.header}>Hobbies:</Text>
          <HHListField
            values={hobbies}
            setValues={setHobbies}
            attribute="hobbies"
            canEdit={user.id === profileUser.id}
          />
          <Text style={styles.header}>Language Goals:</Text>
          <HHListField
            values={languageGoals}
            setValues={setLanguageGoals}
            attribute="languageGoals"
            canEdit={user.id === profileUser.id}
          />
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
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: 10,
    paddingTop: 25,
  },
});
