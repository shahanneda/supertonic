import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import {
  EncodingType,
  FileSystemSessionType,
  readAsStringAsync,
} from "expo-file-system";
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

export default function Upload({}: Props) {
  // const FS = require("expo-file-system").FileSystem;
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const auth = useAuthentication();

  async function uploadFromFile(file: File) {
    SheetMusicService.upload({ file })
      .then()
      .catch((e: ApiError) => {
        console.log(e.body);
      });
  }

  async function uploadFromUri(uri: string, name: string) {
    // Have to do manual request on mobile since the file uri is a bit weird
    const formData = new FormData();
    formData.append("file", {
      uri,
      name,
      type: `application/pdf`,
    } as any);

    try {
      await fetch(OpenAPI.BASE + "/sheet-music/sheet-music/upload", {
        method: "POST",
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${auth}`,
          "Content-Type": "multipart/form-data",
        }),
      });
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

          if (Platform.OS === "web" && result.file) {
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
