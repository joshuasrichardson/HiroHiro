import React, { createContext } from "react";

const AppContext = createContext({
  user: null,
  setUser: () => null,
  friends: null,
  setFriends: () => null,
  unseenUsers: null,
  setUnseenUsers: () => null,
});

export default AppContext;
