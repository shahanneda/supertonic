import { Button, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Configuration, CreateUserDtoFromJSON, UserEntity, UsersApi } from './generated';
import { Login } from './src/components/Login';
import { useAuthentication } from './src/hooks/getUserHook';
import { RootStackParamList } from './src/rootStackParamList';

function HomeScreen() {
  const configuration = new Configuration({
    basePath: "http://localhost:3000",
  });

  const userApi = new UsersApi(configuration);
  const auth = useAuthentication();

  const [user, setUser] = React.useState<UserEntity| null>(null);

  React.useEffect(() => {
   userApi.usersControllerGet({authorization: `Bearer ${auth}`}).then((user) => {
      console.log("GOT user", user)
      setUser(user);
    });
  }, [auth]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {user ? <Text>{user.email} - {user.name}</Text> : null}
      <Button onPress={() => navigation.navigate("Login")} title="Go to Login" />
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