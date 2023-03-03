import { Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import AppContext from "../components/AppContext";
import React, { useState, useContext } from "react";
import HHField from "../components/HHField";
import HHListField from "../components/HHListField";
import { profileStyles } from "../styles";

const Profile = () => {
  const { user } = useContext(AppContext);

  const [nationality, setNationality] = useState(user.nationality);
  const [nativeLanguage, setNativeLanguage] = useState(user.nativeLanguage);
  const [learningLanguage, setLearningLanguage] = useState(
    user.learningLanguage
  );
  const [languageLevel, setLanguageLevel] = useState(user.languageLevel);
  const [hobbies, setHobbies] = useState(user.hobbies);
  const [languageGoals, setLanguageGoals] = useState(user.languageGoals);

  if (user.pictureUrls && user.pictureUrls.length) alert(user.pictureUrls[0]);

  const pictureUrl = require("../../assets/student.jpeg"); //user.pictureUrls.length
  // ? require(url)
  // : require("../../assets/student.jpeg");

  return (
    <SafeAreaView style={profileStyles.outerContainer}>
      <ScrollView contentContainerStyle={profileStyles.scrollContainer}>
        <View style={profileStyles.imageContainer}>
          <Image source={pictureUrl} style={profileStyles.image} />
        </View>
        <View style={profileStyles.titleContainer}>
          <Text style={profileStyles.title}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
        </View>
        <View style={profileStyles.textContainer}>
          <Text style={profileStyles.header}>Nationality:</Text>
          <HHField
            value={nationality}
            setValue={setNationality}
            attribute="nationality"
            canEdit={true}
          />
          <Text style={profileStyles.header}>Native Language:</Text>
          <HHField
            value={nativeLanguage}
            setValue={setNativeLanguage}
            attribute="nativeLanguage"
            canEdit={true}
          />
          <Text style={profileStyles.header}>Studying:</Text>
          <HHField
            value={learningLanguage}
            setValue={setLearningLanguage}
            attribute="learningLanguage"
            canEdit={true}
          />
          <Text style={profileStyles.header}>Language Level:</Text>
          <HHField
            value={languageLevel}
            setValue={setLanguageLevel}
            attribute="languageLevel"
            canEdit={true}
          />
          <Text style={profileStyles.header}>Hobbies:</Text>
          <HHListField
            values={hobbies}
            setValues={setHobbies}
            attribute="hobbies"
            canEdit={true}
          />
          <Text style={profileStyles.header}>Language Goals:</Text>
          <HHListField
            values={languageGoals}
            setValues={setLanguageGoals}
            attribute="languageGoals"
            canEdit={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
