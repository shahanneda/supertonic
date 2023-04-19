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
} from "../../../generated";
import { Wrapper } from "../../components/Wrapper";
import { RootStackParamList } from "../../rootStackParamList";

function AllUsersScreen() {
  const [allUsers, setAllUsers] = React.useState<UserEntity[]>([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  React.useEffect(() => {
    UserService.getAllUsers().then((data) => {
      setAllUsers(data);
    });
  }, [isFocused]);

  return (
    <Wrapper shouldCenterVertically={false}>
      <FlatList
        data={allUsers}
        renderItem={({ item: user }) => {
          return (
            <View style={{ marginVertical: 10 }}>
              <Button
                // onPress={() => {
                // navigation.navigate("MusicTab", {
                //   screen: "SheetMusicScreen",
                //   params: { music: item },
                // }); }}
                title={user.name}
                key={user.id}
              />
            </View>
          );
        }}
      />
    </Wrapper>
  );
}
export { AllUsersScreen };
