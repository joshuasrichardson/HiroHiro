import {
  Animated,
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
import { profileStyles } from "../styles";
import { Snackbar } from "react-native-paper";

const UnknownProfile = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  const { user, friends, setFriends, unseenUsers } = useContext(AppContext);

  const [message, setMessage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");

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
  const [canSwipe, setCanSwipe] = useState(true);

  const onSwipeLeft = () => {
    if (!canSwipe) return;
    setCanSwipe(false);
    ServerFacade.dismissUser(user, profileUser);
    setBackgroundColor("red");
    setMessage(`Dismissed ${profileUser.firstName} ${profileUser.lastName}`);
    setProfileUser(getRandomUnseenUser());
    setTimeout(() => setCanSwipe(true), 1000);
  };

  const onSwipeRight = () => {
    if (!canSwipe) return;
    ServerFacade.addFriend(user, profileUser);
    setFriends([...friends, profileUser]);
    setBackgroundColor("green");
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
    <SafeAreaView style={profileStyles.outerContainer}>
      <Snackbar
        duration={2000}
        style={{
          backgroundColor,
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
        <ScrollView contentContainerStyle={profileStyles.scrollContainer}>
          {profileUser ? (
            <>
              <View style={profileStyles.imageContainer}>
                <Image source={pictureUrl} style={profileStyles.image} />
              </View>
              <View style={profileStyles.titleContainer}>
                <Text style={profileStyles.title}>
                  {`${profileUser.firstName} ${profileUser.lastName}`}
                </Text>
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
