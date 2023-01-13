import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ServerFacade from "../api/ServerFacade";

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(ServerFacade.getUsers());
  }, []);

  const viewProfile = (user) => {
    navigation.navigate("Profile", { profileUser: user });
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users.map((user) => (
        <React.Fragment key={user.email}>
          <ListItem alignItems="flex-start" onClick={() => viewProfile(user)}>
            <ListItemAvatar>
              <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                src="../../assetsJoshuaSan.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${user.firstName} ${user.lastName}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {user.email}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default UserList;
