import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useRef, useContext, useEffect } from "react";
import ServerFacade from "../api/ServerFacade";
import AppContext from "./AppContext";
import { IconButton } from "react-native-paper";

const HHListField = ({ attribute, values, setValues, canEdit }) => {
  const [editing, setEditing] = useState(-1);

  const [textValue, setTextValue] = useState(values?.length ? values[0] : "");
  const refInputs = useRef(values?.length ? [...values] : [textValue]);
  const inputRef = useRef(null);

  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    if (editing >= 0) inputRef.current?.focus();
  }, [editing, inputRef]);

  const addInput = () => {
    refInputs.current.push("");
    setValues(refInputs.current);
    edit(refInputs.current.length - 1);
  };

  const removeInput = (i) => {
    refInputs.current.splice(i, 1)[0];
  };

  const onBlur = async () => {
    if (!textValue) removeInput(editing);
    else refInputs.current[editing] = textValue;
    setValues(refInputs.current);
    const u = await ServerFacade.setUserAttribute(
      user.id,
      attribute,
      refInputs.current,
      user._version
    );
    if (u) setUser(u);
    setEditing(-1);
  };

  const handleFocus = (e) => e.target.focus();

  const edit = (index) => {
    setEditing(index);
    setTextValue(refInputs.current[index]);
  };

  return (
    <>
      {values?.map((v, index) => (
        <View style={styles.container} key={v + index + "-list-field"}>
          {editing === index ? (
            <TextInput
              ref={index === editing ? inputRef : null}
              style={styles.text}
              onChangeText={setTextValue}
              value={textValue}
              onBlur={onBlur}
              onFocus={handleFocus}
            />
          ) : (
            <Text style={styles.text}>{v}</Text>
          )}
          {canEdit && (
            <IconButton
              variant="text"
              style={styles.editButton}
              onPress={() => edit(index)}
              icon="pencil"
              iconColor={styles.editButton.color}
              size={20}
            />
          )}
        </View>
      ))}

      {canEdit && (
        <IconButton
          variant="text"
          key={attribute}
          style={styles.addButton}
          onPress={addInput}
          icon="plus"
          iconColor={styles.addButton.color}
          size={20}
        />
        // {/* <AddIcon /> Add Hobby//TODO */}
      )}
    </>
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
  addButton: { color: "black", paddingLeft: 10 },
  editButton: { color: "black" },
});

export default HHListField;
