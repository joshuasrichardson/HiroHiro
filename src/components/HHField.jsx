import { StyleSheet, Text, TextInput } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import ServerFacade from "../api/ServerFacade";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { ClickAwayListener } from "@mui/material";
import AppContext from "./AppContext";

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

  const handleFocus = (e) => e.target.select();

  const getValueText = () => {
    return <Text style={styles.text}>{value}</Text>;
  };

  const getValueInputText = () => {
    return (
      <ClickAwayListener onClickAway={() => setEditing(false)}>
        <TextInput
          ref={inputRef}
          id={`input-${attribute}`}
          onChangeText={onChangeText}
          value={value}
          style={styles.textInput}
          onBlur={onBlur}
          onFocus={handleFocus}
        />
      </ClickAwayListener>
    );
  };

  const edit = () => {
    setEditing(true);
  };

  return (
    <>
      <div style={styles.container}>
        {editing ? getValueInputText() : getValueText()}
        {canEdit && (
          <Button
            variant="text"
            key={attribute}
            style={styles.editButton}
            onClick={edit}
          >
            <EditIcon />
          </Button>
        )}
      </div>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
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
  editButton: { color: "black", width: "20%" },
});

export default HHField;
