import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import * as React from "react";
import { Button, Text, View } from "react-native";

// import { Configuration, CreateUserDtoFromJSON, UserEntity, UsersApi } from './generated';
import {
  OpenAPI,
  SheetMusicService,
  UserEntity,
  UserService,
} from "../../generated";
import { Wrapper } from "../components/Wrapper";
import { RootStackParamList } from "../rootStackParamList";

function HomeScreen() {
  const [user, setUser] = React.useState<UserEntity | null>(null);

  React.useEffect(() => {
    UserService.getUser().then((user) => {
      console.log("GOT user", user);
      setUser(user);
    });
  }, []);
  const [currentPdfUrl, setCurrentPdfUrl] = React.useState(
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  React.useEffect(() => {
    SheetMusicService.getAllSheetMusic().then((data) => {
      setCurrentPdfUrl(data[0]);
    });
  });

  return (
    <Wrapper shouldCenterVertically={false}>
      <Text>Home Screen</Text>
      {user ? (
        <Text>
          {user.email} - {user.name}
        </Text>
      ) : null}
      <Button
        onPress={() => navigation.navigate("Login")}
        title="Go to Login"
      />
      <Button onPress={() => navigation.navigate("Upload")} title="Upload" />
      <Button
        onPress={() => {
          navigation.navigate("PDF", { url: currentPdfUrl });
        }}
        title="View Pdf File"
      />
      <Text>{currentPdfUrl}</Text>
    </Wrapper>
  );
}
export { HomeScreen };
