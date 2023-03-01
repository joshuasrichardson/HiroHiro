import React, { useState } from "react";
import { AppRegistry, View } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  IconButton,
} from "react-native-paper";
import { expo } from "./app.json";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";
import UnknownProfile from "./src/pages/UnknownProfile";
import Login from "./src/pages/Login";
import ConfirmSignUp from "./src/pages/ConfirmSignUp";
import UserList from "./src/pages/UserList";
import Register from "./src/pages/Register";
import AppContext from "./src/components/AppContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { secondaryBlue } from "./src/styles";

Amplify.configure(awsconfig);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "orange",
    secondary: "blue",
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedInTabs = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex" }, null],
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={route.params}
        options={{
          tabBarIcon: ({ color }) => (
            <IconButton icon="account" iconColor={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="UserList"
        component={UserList}
        initialParams={route.params}
        options={{
          tabBarIcon: ({ color }) => (
            <IconButton icon="account-group" iconColor={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="OtherProfile"
        component={UnknownProfile}
        initialParams={{ ...route.params, profileUser: null }}
        options={{
          tabBarIcon: ({ color }) => (
            <IconButton icon="account-search" iconColor={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [unseenUsers, setUnseenUsers] = useState([]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        friends,
        setFriends,
        unseenUsers,
        setUnseenUsers,
      }}
    >
      <PaperProvider theme={theme}>
        <View
          style={{
            height: 20,
            width: "100%",
            backgroundColor: secondaryBlue,
          }}
        />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
            <Stack.Screen name="LoggedInTabs" component={LoggedInTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
};

AppRegistry.registerComponent(expo.name, () => App);

export default App;
