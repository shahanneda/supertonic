import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "aws-amplify";
import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// import { Configuration, CreateUserDtoFromJSON, UserEntity, UsersApi } from './generated';
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  ApiError,
  OpenAPI,
  SheetMusicService,
  UserEntity,
  UserService,
} from "./generated";
import { Login } from "./src/components/Login";
import { PdfViewer } from "./src/components/PdfViewer";
import Upload from "./src/components/Upload";
import { useAuthentication } from "./src/hooks/useAuthentication";
import { RootStackParamList } from "./src/rootStackParamList";
import { HomeScreen } from "./src/screens/HomeScreen";
import { EditSheetMusicScreen } from "./src/screens/SheetMusic/EditSheetMusicScreen";
import {
  SheetMusicScreen,
  SheetMusicScreenHeaderRight,
} from "./src/screens/SheetMusic/SheetMusicScreen";

OpenAPI.BASE = "http://192.168.1.79:3000";
OpenAPI.TOKEN = async () => {
  const session = await Auth.currentSession();
  return session.getIdToken().getJwtToken();
};
function HomeScreenStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Upload" component={Upload} />
    </Stack.Navigator>
  );
}

function SheetMusicStack() {
  return (
    <Stack.Navigator initialRouteName="SheetMusicScreen">
      <Stack.Screen
        name="SheetMusicScreen"
        component={SheetMusicScreen}
        options={{
          title: "Music Viewer",
          headerRight: SheetMusicScreenHeaderRight,
        }}
        initialParams={{}}
      />
      <Stack.Screen
        name="EditSheetMusicScreen"
        component={EditSheetMusicScreen}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer
      theme={DefaultTheme}
      linking={{ enabled: true, prefixes: ["localhost"] }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            //https://oblador.github.io/react-native-vector-icons/
            let iconName;

            if (route.name === "HomeTab") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "MusicTab") {
              iconName = focused ? "ios-albums" : "ios-albums-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeScreenStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="MusicTab"
          component={SheetMusicStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
