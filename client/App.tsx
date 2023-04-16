import { Button, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Configuration, CreateUserDtoFromJSON, UserEntity, UsersApi } from './generated';
import { Login } from './src/components/Login';
import { useAuthentication } from './src/hooks/useAuthentication';
import { RootStackParamList } from './src/rootStackParamList';

import { ApiError, OpenAPI, UserEntity, UserService } from './generated';
import { Auth } from 'aws-amplify';
import Upload from './src/components/Upload';
OpenAPI.BASE = "http://localhost:3000"
OpenAPI.TOKEN = async () => {
  const session = await Auth.currentSession();
  return session.getIdToken().getJwtToken();
};

function HomeScreen() {
  const [user, setUser] = React.useState<UserEntity | null>(null);

  React.useEffect(() => {
    UserService.getUser().then((user) => {
      console.log("GOT user", user)
      setUser(user);
    })
  }, []);


  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {user ? <Text>{user.email} - {user.name}</Text> : null}
      <Button onPress={() => navigation.navigate("Login")} title="Go to Login" />
      <Button onPress={() => navigation.navigate("Upload")} title="Upload" />
    </View>
  );
}



function App() {


  return (
    <NavigationContainer
          theme={DefaultTheme}
          linking={{ enabled: true, prefixes: ["localhost"] }}>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Login" component={Login} />     
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Upload" component={Upload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;