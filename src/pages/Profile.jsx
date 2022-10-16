import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import HHField from "../components/HHField";
import HHListField from "../components/HHListField";

const Profile = ({ navigation, route }) => {
  const [user, setUser] = useState(route.params);
  const [nationality, setNationality] = useState(user.nationality);
  const [nativeLanguage, setNativeLanguage] = useState(user.nativeLanguage);
  const [learningLanguage, setLearningLanguage] = useState(
    user.learningLanguage
  );
  const [languageLevel, setLanguageLevel] = useState(user.languageLevel);
  const [hobbies, setHobbies] = useState(user.hobbies);
  const [languageGoals, setLanguageGoals] = useState(user.languageGoals);

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
            attribute="nationality"
            user={user}
            setUser={setUser}
          />
          <HHField
            header="Native Language"
            value={nativeLanguage}
            setValue={setNativeLanguage}
            attribute="nativeLanguage"
            user={user}
            setUser={setUser}
          />
          <HHField
            header="Studying"
            value={learningLanguage}
            setValue={setLearningLanguage}
            attribute="learningLanguage"
            user={user}
            setUser={setUser}
          />
          <HHField
            header="Language Level"
            value={languageLevel}
            setValue={setLanguageLevel}
            attribute="languageLevel"
            user={user}
            setUser={setUser}
          />
          <HHListField
            header="Hobbies"
            values={hobbies}
            setValues={setHobbies}
            attribute="hobbies"
            user={user}
            setUser={setUser}
          />
          <Text style={styles.header}>Language Goals:</Text>
          {languageGoals?.map((goal) => (
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
