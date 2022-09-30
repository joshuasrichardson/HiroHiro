import React, { createContext, useState } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";
import Login from "./src/pages/Login";
import ConfirmSignUp from "./src/pages/ConfirmSignUp";
import Register from "./src/pages/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();

// const [user, setUser] = useState({ username: "" });

// export const Context = createContext({
//   user,
//   setUser,
// });

{
  /* <Context.Provider value={{ user: user, setUser: setUser }}> */
}

// </Context.Provider>

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
