import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { Auth } from "aws-amplify";
import * as React from "react";
import { Button, FlatList, Text, View } from "react-native";

// import { Configuration, CreateUserDtoFromJSON, UserEntity, UsersApi } from './generated';
import {
  OpenAPI,
  SheetMusicDocumentEntity,
  SheetMusicService,
  UserEntity,
  UserService,
} from "../../generated";
import { Wrapper } from "../components/Wrapper";
import { HomeTabParamList, RootStackParamList } from "../rootStackParamList";

function HomeScreen() {
  const [user, setUser] = React.useState<UserEntity | null>(null);

  React.useEffect(() => {
    UserService.getUser().then((user) => {
      console.log("GOT user", user);
      setUser(user);
    });
  }, []);
  const [currentSheetMusics, setCurrentSheetMusics] = React.useState<
    SheetMusicDocumentEntity[]
  >([]);

  const isFocused = useIsFocused();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    SheetMusicService.getAllSheetMusic().then((data) => {
      setCurrentSheetMusics(data);
    });
  }, [isFocused]);
  console.log(currentSheetMusics);

  return (
    <Wrapper shouldCenterVertically={false}>
      <Text>Home Screen</Text>
      {user ? (
        <Text>
          {user.email} - {user.name}
        </Text>
      ) : null}
      <Button
        onPress={() => navigation.navigate("HomeTab", { screen: "Login" })}
        title="Go to Login"
      />
      <Button
        onPress={() => navigation.navigate("HomeTab", { screen: "Upload" })}
        title="Upload"
      />
      <FlatList
        data={currentSheetMusics}
        renderItem={({ item }) => {
          const sheetMusic = item;
          return (
            <View style={{ marginVertical: 10 }}>
              <Button
                onPress={() => {
                  navigation.navigate("MusicTab", {
                    screen: "SheetMusicScreen",
                    params: { music: item },
                  });
                }}
                title={sheetMusic.name}
                key={sheetMusic.id}
              />
            </View>
          );
        }}
      />
    </Wrapper>
  );
}
export { HomeScreen };