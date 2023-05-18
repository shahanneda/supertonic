import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { Auth } from "aws-amplify";
import * as React from "react";
import { Button, FlatList, Text, View, TextInput, StyleSheet } from "react-native";

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

function VideoComment() {
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState([]);
  
  const submitComment = () => {
    // Call API to save comment
  };
  
  return (
    <View>
      <TextInput 
        style={styles.input}
        placeholder="Add a comment..."
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Submit" onPress={submitComment} />
      <FlatList
        data={comments}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
}

function AllUsersScreen() {
  // ...
  
  return (
    <Wrapper shouldCenterVertically={false}>
      <VideoComment />
      {/* Rest of code */}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export { AllUsersScreen };
