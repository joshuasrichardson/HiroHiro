import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react";

const HHField = ({ header, value, setValue, saveData, user }) => {
  const [editing, setEditing] = useState(false);

  const onBlur = async (val, setVal) => {
    setEditing(false);
    setVal(user, val);
  };

  return (
    <>
      <Text style={styles.header}>{header}:</Text>
      <Pressable style={styles.editButton} onPress={() => setEditing(true)}>
        {(editing && (
          <TextInput
            onChangeText={setValue}
            value={value}
            style={styles.text}
            onBlur={() => onBlur(value, saveData, setEditing)}
          />
        )) || <Text style={styles.text}>{value}</Text>}
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
