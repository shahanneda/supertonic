import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Button } from "react-native";

import { SheetMusicService, UserService } from "../../generated";
import { useAuthentication } from "../hooks/useAuthentication";
import { RootStackParamList } from "../rootStackParamList";
type Props = object;

export default function Upload({}: Props) {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  async function submitFile(file: File) {
    SheetMusicService.upload({ file });
  }

  return (
    <div>
      <Button
        onPress={async () => {
          console.log("before");
          const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
          });

          // For some reason, typescript does not see the second part of the result, which is a union type
          //@ts-ignore
          if (result.file) {
            //@ts-ignore
            submitFile(result.file);
          }
        }}
        title="Upload"
      />
    </div>
  );
}
