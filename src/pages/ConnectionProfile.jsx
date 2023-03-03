import { Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import HHField from "../components/HHField";
import HHListField from "../components/HHListField";
import { profileStyles } from "../styles";
import { Button } from "react-native-paper";

const ConnectionProfile = ({ route }) => {
  const profileUser = route.params.profileUser;

  const pictureUrl =
    profileUser.lastName === "Family"
      ? require("../../assets/TanakaFamily.png")
      : // ? require(user.pictureUrls[0])
        require("../../assets/student.jpeg");

  return (
    <SafeAreaView style={profileStyles.outerContainer}>
      <ScrollView contentContainerStyle={profileStyles.scrollContainer}>
        <View style={profileStyles.imageContainer}>
          <Image source={pictureUrl} style={profileStyles.image} />
        </View>
        <View style={profileStyles.titleContainer}>
          <Text style={profileStyles.title}>
            {profileUser.firstName + " " + profileUser.lastName}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 20,
            marginBottom: -30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            icon="camera"
            mode="contained"
            onPress={() => alert("Starting video call")}
          >
            Call
          </Button>
          <Button
            icon="message"
            mode="contained"
            onPress={() => alert("Sending message")}
          >
            Text
          </Button>
        </View>
        <View style={profileStyles.textContainer}>
          <Text style={profileStyles.header}>Nationality:</Text>
          <HHField value={profileUser.nationality} />
          <Text style={profileStyles.header}>Native Language:</Text>
          <HHField value={profileUser.nativeLanguage} />
          <Text style={profileStyles.header}>Studying:</Text>
          <HHField value={profileUser.learningLanguage} />
          <Text style={profileStyles.header}>Language Level:</Text>
          <HHField value={profileUser.languageLevel} />
          <Text style={profileStyles.header}>Hobbies:</Text>
          <HHListField values={profileUser.hobbies} />
          <Text style={profileStyles.header}>Language Goals:</Text>
          <HHListField values={profileUser.languageGoals} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConnectionProfile;
