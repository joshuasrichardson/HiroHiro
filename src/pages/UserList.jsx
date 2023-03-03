import React, { useContext, useState } from "react";
import AppContext from "../components/AppContext";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { IconButton, List } from "react-native-paper";
import ConnectionProfile from "./ConnectionProfile";
import SlideDownOnExit from "../components/SlideDownOnExit";

const UserList = () => {
  const { friends } = useContext(AppContext);

  const [profileUser, setProfileUser] = useState(null);
  const [open, setOpen] = useState(false);

  const viewProfile = (newProfileUser) => {
    setOpen(true);
    setProfileUser(newProfileUser);
  };

  const closeProfile = () => {
    setOpen(false);
    setTimeout(() => setProfileUser(null), 300);
  };

  if (profileUser) {
    return (
      <SlideDownOnExit open={open}>
        <IconButton icon="arrow-down" onPress={closeProfile} />
        <ConnectionProfile route={{ params: { profileUser } }} />
      </SlideDownOnExit>
    );
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <List.Section style={{ width: "100%", height: "100%" }}>
          <List.Subheader style={{ fontSize: 18 }}>
            My Connections
          </List.Subheader>
          {friends?.map((u) => (
            <List.Item
              key={u.email}
              title={`${u.firstName} ${u.lastName}`}
              description={`${u.nativeLanguage}`}
              style={{
                height: 70,
                borderTopWidth: 1,
                borderTopColor: "lightgrey",
              }}
              left={(props) => <List.Icon {...props} icon="account" />}
              onPress={() => viewProfile(u)}
            ></List.Item>
          ))}
          <List.Item
            style={{
              borderTopWidth: 1,
              borderTopColor: "lightgrey",
            }}
          ></List.Item>
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserList;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    display: "flex",
    alignItems: "center",
  },
});
