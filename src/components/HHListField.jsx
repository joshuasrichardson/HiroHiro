import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import React, { useState, useRef } from "react";
import ServerFacade from "../api/ServerFacade";

const HHListField = ({
  header,
  attribute,
  values,
  setValues,
  user,
  setUser,
}) => {
  const [editing, setEditing] = useState(-1);

  const [textValue, setTextValue] = useState(values?.length ? values[0] : "");
  const refInputs = useRef(values?.length ? [...values] : [textValue]);

  const addInput = () => {
    refInputs.current.push("");
  };

  const removeInput = (i) => {
    refInputs.current.splic(i, 1)[0];
  };

  const onBlur = async () => {
    refInputs.current[editing] = textValue;
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

  const getValueText = (v) => {
    return <Text style={styles.text}>{v}</Text>;
  };

  const getValueInputText = (index) => {
    return (
      <TextInput
        style={styles.text}
        onChangeText={setTextValue}
        value={textValue}
        onBlur={onBlur}
      />
    );
  };

  return (
    <>
      <Text key={header} style={styles.header}>
        {header}:
      </Text>
      {values?.map((v, index) => (
        <Pressable
          key={v + index}
          style={styles.editButton}
          onPress={() => {
            setEditing(index);
            setTextValue(refInputs.current[index]);
          }}
        >
          {(editing === index && getValueInputText(index)) || getValueText(v)}
        </Pressable>
      ))}
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

export default HHListField;
