import React, { createContext } from "react";

const AppContext = createContext({
  user: null,
  setUser: () => null,
});

export default AppContext;
