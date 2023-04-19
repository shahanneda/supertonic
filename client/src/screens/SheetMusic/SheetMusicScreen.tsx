import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, Platform, View } from "react-native";
import { Document, Page, pdfjs } from "react-pdf";

import { SheetMusicPageEntity, SheetMusicService } from "../../../generated";
import { PdfViewer } from "../../components/PdfViewer";
import {
  MusicTabParamList,
  RootStackParamList,
} from "../../rootStackParamList";

type Props = NativeStackScreenProps<MusicTabParamList, "SheetMusicScreen">;

function SheetMusicScreen({ navigation, route }: Props) {
  console.log(route.params);
  console.log("In sheet music screen");
  const [pages, setPages] = useState<SheetMusicPageEntity[]>([]);

  const { music } = route.params;

  useEffect(() => {
    if (music) {
      console.log("makiing api call", music.id);
      SheetMusicService.getPagesForSheetMusic(music.id).then((data) => {
        setPages(data);
      });
    }
  }, [music]);

  if (!route.params.music || !pages || pages.length === 0) {
    console.log("early return");
    return;
  }

  navigation.setOptions({ headerTitle: music?.name });

  return <PdfViewer url={pages[0].url} />;
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
