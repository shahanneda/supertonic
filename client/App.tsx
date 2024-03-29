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
import { StatusBar } from "expo-status-bar";
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
import Recordings from "./src/components/Recordings";
import UploadSheetMusic from "./src/components/UploadSheetMusic";
import { useAuthentication } from "./src/hooks/useAuthentication";
import { RootStackParamList } from "./src/rootStackParamList";
import { HomeScreen } from "./src/screens/HomeScreen";
import { EditSheetMusicScreen } from "./src/screens/SheetMusic/EditSheetMusicScreen";
import { SheetMusicBrowserScreen } from "./src/screens/SheetMusic/SheetMusicBrowserScreen";
import {
  SheetMusicScreen,
  SheetMusicScreenHeaderRight,
} from "./src/screens/SheetMusic/SheetMusicScreen";
import { AllUsersScreen } from "./src/screens/Social/AllUsersScreen";
import RecordScreen from "./src/screens/Social/RecordScreen";

// //https://oblador.github.io/react-native-vector-icons/
const tabNameToNormalIcon: Record<keyof RootStackParamList, string> = {
  HomeTab: "ios-home",
  MusicTab: "ios-albums",
  SocialTab: "ios-people",
};
const tabNameToFocusedIcon: Record<keyof RootStackParamList, string> = {
  HomeTab: "ios-home-outline",
  MusicTab: "ios-albums-outline",
  SocialTab: "ios-people-outline",
};

OpenAPI.BASE =
  process.env.NODE_ENV === "production"
    ? "https://api.getsupertonic.com"
    : "http://localhost:3000";

// OpenAPI.BASE = "https://api.getsupertonic.com";
// OpenAPI.BASE = "http://192.168.1.79:3000";
// OpenAPI.BASE = "http://localhost:3000";
OpenAPI.TOKEN = async () => {
  const session = await Auth.currentSession();
  return session.getIdToken().getJwtToken();
};
function HomeScreenStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function SheetMusicStack() {
  return (
    <Stack.Navigator initialRouteName="SheetMusicBrowser">
      <Stack.Screen
        name="SheetMusicBrowser"
        component={SheetMusicBrowserScreen}
        options={{
          title: "Browser",
        }}
        initialParams={{}}
      />
      <Stack.Screen
        name="UploadSheetMusicScreen"
        component={UploadSheetMusic}
      />
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

function SocialStack() {
  return (
    <Stack.Navigator initialRouteName="AllUsersScreen">
      <Stack.Screen name="AllUsers" component={AllUsersScreen} />
      <Stack.Screen name="RecordingsScreen" component={Recordings} />
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
    </Stack.Navigator>
  );
}

function App() {
  const [user, setUser] = React.useState(null);
  const auth = useAuthentication();
  if (!auth && user === null) {
    return (
      <>
        <StatusBar style="auto" />
        <Login updatedCallback={setUser} />
      </>
    );
  }
  const config = {
    screens: {
      MusicTab: {
        screens: {
          Profile: "users/:id",
          Settings: "settings",
        },
      },
    },
  };

  return (
    <>
      <NavigationContainer
        theme={DefaultTheme}
        linking={{
          enabled: true,
          prefixes: ["localhost"],
          // config: {
          //   screens: {
          //     HomeTab: {
          //       path: "Home",
          //     },
          //     MusicTab: {
          //       path: "Music",
          //     },
          //   },
          // },
          // getStateFromPath(path, options?) {
          //   console.log("getStateFromPath", path, options);
          // },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = focused
                ? tabNameToFocusedIcon[route.name]
                : tabNameToNormalIcon[route.name];

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeScreenStack}
            options={{ headerShown: false, title: "Home" }}
          />
          <Tab.Screen
            name="MusicTab"
            component={SheetMusicStack}
            options={{ headerShown: false, title: "Music" }}
          />
          <Tab.Screen
            name="SocialTab"
            component={SocialStack}
            options={{ headerShown: false, title: "Social" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
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
