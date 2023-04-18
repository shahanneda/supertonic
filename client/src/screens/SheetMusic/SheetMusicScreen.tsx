import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Platform, View } from "react-native";
import { Document, Page, pdfjs } from "react-pdf";

import { PdfViewer } from "../../components/PdfViewer";
import {
  MusicTabParamList,
  RootStackParamList,
} from "../../rootStackParamList";

type Props = NativeStackScreenProps<MusicTabParamList, "SheetMusicScreen">;

function SheetMusicScreen({ navigation, route }: Props) {
  console.log(route.params);
  console.log("In sheet music screen");

  if (!route.params.music) {
    console.log("early return");
    return;
  }

  const { music } = route.params;

  navigation.setOptions({ headerTitle: music?.name });

  return <PdfViewer url={music.url} />;
}

function SheetMusicScreenHeaderRight() {
  const route = useRoute<RouteProp<MusicTabParamList, "SheetMusicScreen">>();
  const music = route.params.music;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Button
      title="Edit"
      onPress={() => {
        navigation.navigate("MusicTab", {
          screen: "EditSheetMusicScreen",
          params: { music },
        });
      }}
    />
  );
}

export { SheetMusicScreen, SheetMusicScreenHeaderRight };
