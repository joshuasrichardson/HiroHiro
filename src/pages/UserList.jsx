import React, { useState, useEffect, useContext } from "react";
import AppContext from "../components/AppContext";
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
  const { user } = useContext(AppContext);

  useEffect(() => {
    const setup = async () => setUsers(await ServerFacade.getFriends(user.id));
    setup();
  }, []);

  const viewProfile = (profileUser) => {
    navigation.navigate("OtherProfile", { profileUser });
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users?.map((u) => (
        <React.Fragment key={u.email}>
          <ListItem alignItems="flex-start" onClick={() => viewProfile(u)}>
            <ListItemAvatar>
              <Avatar
                alt={`${u.firstName} ${u.lastName}`}
                src="../../assetsJoshuaSan.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${u.firstName} ${u.lastName}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {u.email}
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
