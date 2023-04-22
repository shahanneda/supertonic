import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Button, Platform, View } from "react-native";

import {
  ApiError,
  OpenAPI,
  SheetMusicService,
  UserService,
} from "../../generated";
import { useAuthentication } from "../hooks/useAuthentication";
import { RootStackParamList } from "../rootStackParamList";
type Props = object;

export default function UploadSheetMusic({}: Props) {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const auth = useAuthentication();

  async function uploadFromFile(file: File) {
    SheetMusicService.upload({ file })
      .then(() => {
        navigator.goBack();
      })
      .catch((e: ApiError) => {
        console.log(e.body);
      });
  }

  async function uploadFromUri(uri: string, name: string) {
    console.log("doing upload");
    // Have to do manual request on mobile since the file uri is a bit weird
    const formData = new FormData();
    formData.append("file", {
      uri,
      name,
      type: `application/pdf`,
    } as any);
    console.log(formData);

    try {
      const res = fetch(OpenAPI.BASE + "/sheet-music/upload", {
        method: "POST",
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${auth}`,
          "Content-Type": "multipart/form-data",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          navigator.goBack();
        });
      // console.log(await res.());
    } catch (e) {
      console.log("Failed to upload file", e);
    }
  }

  return (
    <View>
      <Button
        onPress={async () => {
          const result = (await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
          })) as any;

          if (Platform.OS === "web") {
            uploadFromFile(result.file);
          } else {
            uploadFromUri(result.uri, result.name);
          }
        }}
        title="Upload"
      />
    </View>
  );
}
