import React, { useState, useEffect } from "react";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Tabs,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedInTabs = ({ route }) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={route.params}
        options={{ tabBarIcon: () => <PersonIcon />, cardStyle: { flex: 1 } }}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        initialParams={route.params}
        options={{ tabBarIcon: () => <GroupIcon />, cardStyle: { flex: 1 } }}
      />
      <Stack.Screen
        name="OtherProfile"
        component={Profile}
        initialParams={route.params}
        options={{
          tabBarIcon: () => <TravelExploreIcon />,
          cardStyle: { flex: 1 },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
          <Stack.Screen name="LoggedInTabs" component={LoggedInTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
