import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import ServerFacade from "../api/ServerFacade";
import AppContext from "./AppContext";
import { IconButton } from "react-native-paper";

const HHField = ({ attribute, value, setValue, canEdit }) => {
  const [editing, setEditing] = useState(false);
  const [changed, setChanged] = useState(false);

  const inputRef = useRef(null);

  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing, inputRef]);

  const onBlur = async () => {
    setEditing(false);
    if (changed) {
      const u = await ServerFacade.setUserAttribute(
        user.id,
        attribute,
        value,
        user._version
      );
      if (u) setUser(u);
    }
    setChanged(false);
  };

  const onChangeText = (v) => {
    setChanged(true);
    setValue(v);
  };

  const handleFocus = (e) => e.target.focus();

  const getValueText = () => {
    return <Text style={styles.text}>{value}</Text>;
  };

  const getValueInputText = () => {
    return (
      <Pressable onPressOut={() => setEditing(false)}>
        <TextInput
          ref={inputRef}
          id={`input-${attribute}`}
          onChangeText={onChangeText}
          value={value}
          style={styles.textInput}
          onBlur={onBlur}
          onFocus={handleFocus}
        />
      </Pressable>
    );
  };

  const edit = () => {
    setEditing(true);
  };

  return (
    <View style={styles.container}>
      {editing ? getValueInputText() : getValueText()}
      {canEdit && (
        <IconButton
          variant="text"
          key={attribute}
          style={styles.editButton}
          onPress={edit}
          icon="pencil"
          iconColor={styles.editButton.color}
          size={20}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: 10,
    paddingTop: 25,
  },
  text: {
    fontSize: "20px",
    width: "80%",
    padding: 10,
  },
  textInput: {
    fontSize: "20px",
    width: "80%",
    borderBottomWidth: 1,
    padding: 10,
  },
  editButton: { color: "black" },
});

export default HHField;
