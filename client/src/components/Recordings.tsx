import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import React, { useRef, useState } from "react";
import { Button, FlatList, Platform, View } from "react-native";

import { Wrapper } from "./Wrapper";
import {
  RecordingEntity,
  SheetMusicDocumentEntity,
  SheetMusicService,
  UserService,
} from "../../generated";
import {
  MusicTabParamList,
  RootStackParamList,
  SocialTabParamList,
} from "../rootStackParamList";

function Recordings() {
  const route = useRoute<RouteProp<SocialTabParamList, "RecordingsScreen">>();
  const { userId } = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [recordings, setRecordings] = React.useState<RecordingEntity[]>([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

  navigation.setOptions({ headerRight: RecordingsScreenRight });

  React.useEffect(() => {
    UserService.getAllRecordings(userId).then((data) => {
      setRecordings(data);
    });
  }, [isFocused]);

  return (
    <Wrapper shouldCenterVertically={false}>
      {currentVideoUrl ? (
        <View style={{ maxHeight: 300, maxWidth: 400 }}>
          <VideoViewer url={currentVideoUrl} />
        </View>
      ) : null}
      <FlatList
        data={recordings}
        renderItem={({ item: recording }) => {
          return (
            <View style={{ marginVertical: 10 }}>
              <Button
                onPress={() => {
                  setCurrentVideoUrl(recording.url);
                }}
                title={recording.name}
                key={recording.id}
              />
            </View>
          );
        }}
      />
    </Wrapper>
  );
}

export default Recordings;

function RecordingsScreenRight() {
  const route = useRoute<RouteProp<SocialTabParamList, "RecordingsScreen">>();
  const userId = route.params.userId;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Button
      title="Record"
      onPress={() => {
        navigation.navigate("SocialTab", {
          screen: "RecordScreen",
          params: { userId },
        });
      }}
    />
  );
}

function VideoViewer({ url }: { url: string }) {
  const videoRef = useRef(null);
  if (Platform.OS == "web") {
    return (
      <video src={url} controls style={{ height: "100%", width: "100%" }} />
    );
  }
  return (
    <View>
      <Video
        style={{ height: 300, width: 400 }}
        ref={videoRef}
        source={{
          uri: url,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  );
}
