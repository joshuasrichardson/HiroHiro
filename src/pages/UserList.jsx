import React, { useContext } from "react";
import AppContext from "../components/AppContext";
import { List } from "react-native-paper";

const UserList = ({ navigation }) => {
  const { friends } = useContext(AppContext);

  const viewProfile = (profileUser) => {
    navigation.navigate("OtherProfile", { profileUser });
  };

  return (
    <List.Section style={{ width: "100%", height: "100%" }}>
      <List.Subheader style={{ fontSize: 18 }}>My Connections</List.Subheader>
      {friends?.map((u) => (
        <List.Item
          key={u.email}
          title={`${u.firstName} ${u.lastName}`}
          description={`${u.nativeLanguage}`}
          style={{
            height: "11%",
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
  );
};

export default UserList;
