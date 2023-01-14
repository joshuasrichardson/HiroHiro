import React, { useState } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";
import Login from "./src/pages/Login";
import ConfirmSignUp from "./src/pages/ConfirmSignUp";
import UserList from "./src/pages/UserList";
import Register from "./src/pages/Register";
import AppContext from "./src/components/AppContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({ username: "" });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="UserList" component={UserList} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
