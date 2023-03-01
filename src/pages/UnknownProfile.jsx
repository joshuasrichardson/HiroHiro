import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import AppContext from "../components/AppContext";
import React, { useState, useRef, useContext } from "react";
import HHField from "../components/HHField";
import HHListField from "../components/HHListField";
import ServerFacade from "../api/ServerFacade";
import { primaryOrange } from "../styles";
import { Button, Snackbar } from "react-native-paper";

const UnknownProfile = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  const { user, friends, setFriends, unseenUsers } = useContext(AppContext);

  const [message, setMessage] = useState("");

  const onDismissSnackBar = () => setMessage("");

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

  const [profileUser, setProfileUser] = useState(getRandomUnseenUser());

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

  const [canSwipe, setCanSwipe] = useState(true);

  const onSwipeLeft = () => {
    if (!canSwipe) return;
    setCanSwipe(false);
    ServerFacade.dismissUser(user, profileUser);
    setMessage(`Dismissed ${profileUser.firstName} ${profileUser.lastName}`);
    setProfileUser(getRandomUnseenUser());
    setTimeout(() => setCanSwipe(true), 1000);
  };

  const onSwipeRight = () => {
    if (!canSwipe) return;
    ServerFacade.addFriend(user, profileUser);
    setFriends([...friends, profileUser]);
    setMessage(`Added ${profileUser.firstName} ${profileUser.lastName}`);
    setProfileUser(getRandomUnseenUser());
    setTimeout(() => setCanSwipe(true), 1000);
  };

  const pictureUrl =
    profileUser.lastName === "Family"
      ? require("../../assets/TanakaFamily.png")
      : // ? require(user.pictureUrls[0])
        require("../../assets/student.jpeg");

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Snackbar
        duration={2000}
        style={{
          backgroundColor: message.includes("Added") ? "green" : "red",
        }}
        visible={!!message}
        onDismiss={onDismissSnackBar}
      >
        {message}
      </Snackbar>
      <ScrollView
        contentContainerStyle={{ width: "100%", height: "100%" }}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        onScrollEndDrag={(event) => {
          if (event.nativeEvent.contentOffset.x > 80) onSwipeLeft();
          if (event.nativeEvent.contentOffset.x < -80) onSwipeRight();
        }}
        scrollEventThrottle={1}
      >
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
              {friends.includes(profileUser) && (
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
                    onPress={() => console.log("Pressed")}
                  >
                    Call
                  </Button>
                  <Button
                    icon="message"
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                  >
                    Text
                  </Button>
                </View>
              )}
              <View style={styles.textContainer}>
                <Text style={styles.header}>Nationality:</Text>
                <HHField
                  value={nationality}
                  setValue={setNationality}
                  attribute="nationality"
                  canEdit={false}
                />
                <Text style={styles.header}>Native Language:</Text>
                <HHField
                  value={nativeLanguage}
                  setValue={setNativeLanguage}
                  attribute="nativeLanguage"
                  canEdit={false}
                />
                <Text style={styles.header}>Studying:</Text>
                <HHField
                  value={learningLanguage}
                  setValue={setLearningLanguage}
                  attribute="learningLanguage"
                  canEdit={false}
                />
                <Text style={styles.header}>Language Level:</Text>
                <HHField
                  value={languageLevel}
                  setValue={setLanguageLevel}
                  attribute="languageLevel"
                  canEdit={false}
                />
                <Text style={styles.header}>Hobbies:</Text>
                <HHListField
                  values={hobbies}
                  setValues={setHobbies}
                  attribute="hobbies"
                  canEdit={false}
                />
                <Text style={styles.header}>Language Goals:</Text>
                <HHListField
                  values={languageGoals}
                  setValues={setLanguageGoals}
                  attribute="languageGoals"
                  canEdit={false}
                />
              </View>
            </>
          ) : (
            <Text>No Unseen Users</Text>
          )}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UnknownProfile;

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
