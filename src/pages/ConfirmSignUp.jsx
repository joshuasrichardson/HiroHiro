import React, { useState } from "react";
import { StyleSheet, TextInput, Platform, View } from "react-native";
import HHButton from "../components/HHButton";
import HHView from "../components/HHView";
import ServerFacade from "../api/ServerFacade";
import { primaryOrange } from "../styles";

const ConfirmSignUp = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.email);
  const [code, setCode] = useState("");

  const confirm = async () => {
    ServerFacade.confirmSignUp(email, code);
    console.log("Confirmed", email, code);
    navigation.navigate("Profile", { email });
    setEmail("");
    setCode("");
  };

  return (
    <HHView>
      <View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.modalInput}
        />
        <TextInput
          secureTextEntry
          value={code}
          onChangeText={setCode}
          placeholder="Code"
          style={styles.modalInput}
        />
      </View>
      <HHButton title="Confirm" onPress={confirm} />
    </HHView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: primaryOrange,
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
    backgroundColor: primaryOrange,
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

export default ConfirmSignUp;
