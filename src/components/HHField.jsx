import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react";
import ServerFacade from "../api/ServerFacade";

const HHField = ({ header, attribute, value, setValue, user, setUser }) => {
  const [editing, setEditing] = useState(false);

  const onBlur = async () => {
    setEditing(false);
    const u = await ServerFacade.setUserAttribute(
      user.id,
      attribute,
      value,
      user._version
    );
    if (u) setUser(u);
  };

  const getValueText = () => {
    return <Text style={styles.text}>{value}</Text>;
  };

  const getValueInputText = () => {
    return (
      <TextInput
        onChangeText={setValue}
        value={value}
        style={styles.text}
        onBlur={onBlur}
      />
    );
  };

  return (
    <>
      <Text key={header} style={styles.header}>
        {header}:
      </Text>
      <Pressable
        key={header + "pressable"}
        style={styles.editButton}
        onPress={() => setEditing(true)}
      >
        {(editing && getValueInputText()) || getValueText()}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
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
  editButton: {},
});

export default HHField;
