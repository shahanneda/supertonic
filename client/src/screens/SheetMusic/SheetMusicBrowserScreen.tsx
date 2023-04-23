import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  EncodingType,
  FileSystemSessionType,
  readAsStringAsync,
  downloadAsync,
  cacheDirectory,
  documentDirectory,
} from "expo-file-system";
import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  StyleSheet,
  Platform,
  Pressable,
  View,
  FlatList,
} from "react-native";

import {
  SheetMusicDocumentEntity,
  SheetMusicService,
} from "../../../generated";
import { Wrapper } from "../../components/Wrapper";
import { RootStackParamList } from "../../rootStackParamList";

function SheetMusicBrowserScreen() {
  const [currentSheetMusics, setCurrentSheetMusics] = React.useState<
    SheetMusicDocumentEntity[]
  >([]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    SheetMusicService.getAllSheetMusic().then((data) => {
      setCurrentSheetMusics(data);
    });
  }, [isFocused]);
  console.log(currentSheetMusics);

  return (
    <Wrapper shouldCenterVertically={false}>
      <Button
        onPress={() =>
          navigation.navigate("MusicTab", { screen: "UploadSheetMusicScreen" })
        }
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
                    params: { id: sheetMusic.id, name: sheetMusic.name },
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
export { SheetMusicBrowserScreen };
