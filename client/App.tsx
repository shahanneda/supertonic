import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Configuration, CreateUserDtoFromJSON, UserEntity, UsersApi } from './generated';
import { Login } from './src/components/Login';

function HomeScreen() {
  const configuration = new Configuration({
    basePath: "http://localhost:3000",
  });

  const userApi = new UsersApi(configuration);
  const [user, setUser] = React.useState<UserEntity| null>(null);

  React.useEffect(() => {
   userApi.usersControllerFindByEmail({email: "shahan.neda@gmail.com"}).then((user) => {
      console.log("user", user)
      setUser(user);
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {/* {user ? <Text>{user.email} - {user.name}</Text> : null} */}
    </View>
  );
}



function App() {


  return (
    <NavigationContainer
          theme={DarkTheme}
          linking={{ enabled: false, prefixes: ["localhost"] }}>
      <Stack.Navigator initialRouteName="Login">
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;