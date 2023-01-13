import { StyleSheet, Text, TextInput } from "react-native";
import React, { useState, useRef, useContext, useEffect } from "react";
import ServerFacade from "../api/ServerFacade";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { AppContext } from "../../App";

const HHListField = ({ attribute, values, setValues }) => {
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

  const handleFocus = (e) => e.target.select();

  const edit = (index) => {
    setEditing(index);
    setTextValue(refInputs.current[index]);
  };

  return (
    <>
      {values?.map((v, index) => (
        <div style={styles.container} key={v + index + "-list-field"}>
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
          <Button
            variant="text"
            style={styles.editButton}
            onClick={() => edit(index)}
          >
            <EditIcon />
          </Button>
        </div>
      ))}
      <Button style={styles.addButton} onClick={addInput}>
        <AddIcon /> Add Hobby
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
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
  addButton: { color: "black", width: "fit-content", paddingLeft: 10 },
  editButton: { color: "black", width: "20%" },
});

export default HHListField;
