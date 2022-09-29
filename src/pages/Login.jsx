import React, { useState, useContext } from "react";
import { StyleSheet, TextInput, Platform, View } from "react-native";
import { DataStore } from "aws-amplify";
import { User } from "../models";
import HHButton from "../components/HHButton";
import HHView from "../components/HHView";
import ServerFacade from "../api/ServerFacade";
// import { Context } from "../../App";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { setUser } = useContext(Context);

  const login = async () => {
    try {
      const user = await ServerFacade.login(email, password);
      if (user) {
        navigation.navigate("Profile", { email });
        // setUser(user);
        // setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.log("TODO: Show error message to user");
    }
  };

  return (
    <HHView>
      <View>
        <TextInput
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.modalInput}
        />
        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.modalInput}
        />
      </View>
      <HHButton title="Login" onPress={login} />
    </HHView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "orange",
    paddingTop: Platform.OS === "ios" ? 44 : 0,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 16,
    textAlign: "center",
  },
  userContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 2,
    elevation: 4,
    flexDirection: "row",
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  userHeading: {
    fontSize: 20,
    fontWeight: "600",
  },
  checkbox: {
    borderRadius: 2,
    borderWidth: 2,
    fontWeight: "700",
    height: 20,
    marginLeft: "auto",
    textAlign: "center",
    width: 20,
  },
  completedCheckbox: {
    backgroundColor: "#000",
    color: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    padding: 16,
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "orange",
    borderRadius: 99,
    paddingHorizontal: 8,
  },
  floatingButton: {
    position: "absolute",
    bottom: 44,
    elevation: 6,
    shadowOffset: {
      height: 4,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  modalInnerContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    padding: 16,
  },
  modalInput: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  modalDismissButton: {
    marginLeft: "auto",
  },
  modalDismissText: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default Login;
