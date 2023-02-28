import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AppContext from "../components/AppContext";
import React, { useState, useContext } from "react";
import HHField from "../components/HHField";
import HHListField from "../components/HHListField";
import GestureRecognizer from "react-native-swipe-gestures";
import ServerFacade from "../api/ServerFacade";
import { primaryOrange } from "../styles";
import { Button, Snackbar } from "react-native-paper";

const Profile = ({ navigation, route }) => {
  const { user, friends, unseenUsers } = useContext(AppContext);

  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const isFriend = (id) => friends.some((f) => f.id === id);

  const getRandomUnseenUser = () => {
    const i = Math.abs(Math.floor(Math.random() * unseenUsers.length));
    let u = unseenUsers[i];
    for (
      let count = 0;
      u.id === user.id && isFriend(u.id) && count < 100;
      count++
    ) {
      u = unseenUsers[i];
      if (count === 98) return null;
    }
    return u;
  };

  const profileUser = route.params.profileUser || getRandomUnseenUser();

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
  // const [isShowingCheck, setIsShowingCheck] = useState(false);
  // const [isShowingX, setIsShowingX] = useState(false);

  const onSwipeLeft = () => {
    if (user.id !== profileUser.id) {
      if (isFriend(profileUser.id)) return;
      ServerFacade.dismissUser(user, profileUser);
      // setIsShowingX(true);
      onToggleSnackBar();
      navigation.navigate("OtherProfile", {
        profileUser: getRandomUnseenUser(),
      });
      setTimeout(() => setIsShowingX(false), 1000);
    }
  };

  const onSwipeRight = () => {
    if (user.id !== profileUser.id) {
      if (isFriend(profileUser.id)) return;
      ServerFacade.addFriend(user, profileUser);
      // setIsShowingCheck(true);
      onToggleSnackBar();
      navigation.navigate("OtherProfile", {
        profileUser: getRandomUnseenUser(),
      });
      setTimeout(() => setIsShowingCheck(false), 1000);
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
    gestureIsClickThreshold: 180,
  };

  const pictureUrl = user.pictureUrls?.length
    ? require("../../assets/JoshuaSan.jpg")
    : // ? require(user.pictureUrls[0])
      require("../../assets/student.jpeg");

  return (
    <GestureRecognizer
      onSwipeLeft={(state) => onSwipeLeft(state)}
      onSwipeRight={(state) => onSwipeRight(state)}
      config={config}
      style={styles.outerContainer}
    >
      <SafeAreaView style={styles.outerContainer}>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Undo",
            onPress: () => {
              // Do something
            },
          }}
        >
          Hey there! I'm a Snackbar.
        </Snackbar>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {profileUser ? (
            <>
              <View style={styles.imageContainer}>
                <Image source={pictureUrl} style={styles.image} />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  {profileUser.firstName + " " + profileUser.lastName}
                </Text>
              </View>
              <View style={styles.textContainer}>
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
              {/* <Fade in={isShowingCheck}>
                //TODO
                <CheckCircleIcon //TODO
                  style={{
                    display: "float",
                    position: "fixed",
                    top: "25vh",
                    left: "25%",
                    width: "50%",
                    height: "50%",
                    color: "green",
                  }}
                />
              </Fade> */}
              {/* <Fade in={isShowingX}>
                //TODO
                <CancelIcon //TODO
                  style={{
                    display: "float",
                    position: "fixed",
                    top: "25vh",
                    left: "25%",
                    width: "50%",
                    height: "50%",
                    color: "red",
                  }}
                />
              </Fade> */}
            </>
          ) : (
            <Text>No Unseen Users</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </GestureRecognizer>
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
    borderColor: primaryOrange,
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
    flex: 1,
    width: "100%",
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
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: 10,
    paddingTop: 25,
  },
});
