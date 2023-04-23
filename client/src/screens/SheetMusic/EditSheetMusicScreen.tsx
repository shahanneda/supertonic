import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button, Platform, TextInput, View } from "react-native";
import { Document, Page, pdfjs } from "react-pdf";

import { SheetMusicService } from "../../../generated";
import { PdfViewer } from "../../components/PdfViewer";
import { Wrapper } from "../../components/Wrapper";
import {
  MusicTabParamList,
  RootStackParamList,
} from "../../rootStackParamList";

type Props = NativeStackScreenProps<MusicTabParamList, "EditSheetMusicScreen">;

function EditSheetMusicScreen({ navigation, route }: Props) {
  const id = route.params.id;
  const oldName = route.params.name;

  const [name, setName] = useState(oldName ?? "");

  if (!id) {
    return;
  }

  async function submitChange() {
    const updateMusic = await SheetMusicService.updateSheetMusic({
      id,
      name,
    });
    console.log("updateMusic", updateMusic);
    navigation.navigate("SheetMusicScreen", { id, name });
  }

  return (
    <Wrapper>
      <TextInput
        onChangeText={(e) => {
          setName(e);
        }}
        value={name}
      />
      <Button
        title="Save"
        onPress={() => {
          submitChange();
        }}
      />
    </Wrapper>
  );
}

export { EditSheetMusicScreen };
