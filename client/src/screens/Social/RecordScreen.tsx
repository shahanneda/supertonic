import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Text, Button, Platform, View, TextInput } from "react-native";

import { ApiError, OpenAPI, UserService } from "../../../generated";
import { useAuthentication } from "../../hooks/useAuthentication";
import { RootStackParamList } from "../../rootStackParamList";

function RecordScreen() {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const auth = useAuthentication();

  async function uploadFromFile(file: File) {
    console.log(file);

    UserService.upload({ file })
      .then(() => {
        navigator.goBack();
      })
      .catch((e: ApiError) => {
        console.log(e.body);
      });
  }

  async function uploadFromUri(uri: string, name: string) {
    console.log("doing mobile upload");
    // Have to do manual request on mobile since the file uri is a bit weird
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: name ?? "new file",
      type: `video/mp4`,
    } as any);

    try {
      const res = fetch(OpenAPI.BASE + "/user/recordings/upload", {
        method: "POST",
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${auth}`,
          // "Content-Type": "multipart/form-data",
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
  const [uploadResult, setUploadResult] = useState<any>();
  const [fileName, setFileName] = useState("");

  function doUpload() {
    if (Platform.OS === "web") {
      // Rename file to match what we want
      const file = uploadResult.file;
      const blob = file.slice(0, file.size, "video/mp4");
      const newFile = new File([blob], fileName, { type: "video/mp4" });
      uploadFromFile(newFile);
    } else {
      const file = uploadResult.assets[0];
      uploadFromUri(file.uri, fileName);
    }
  }
  async function recordVideo() {
    ImagePicker.requestCameraPermissionsAsync();
    if (Platform.OS === "web") {
      const result = (await DocumentPicker.getDocumentAsync({
        type: "video/*",
      })) as any;
      setUploadResult(result);
    } else {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      setUploadResult(result);
    }
  }

  return (
    <View
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Button
        onPress={async () => {
          recordVideo();
        }}
        title={uploadResult ? "Rerecord" : "Record a Video"}
      />
      <TextInput
        editable
        onChangeText={(text) => setFileName(text)}
        value={fileName}
        style={{ padding: 10 }}
        placeholder="Enter a name for your video"
        textAlign="center"
        placeholderTextColor="gray"
      />
      {/* <Text style={{ textAlign: "center" }}>
        Currently there {uploadResult ? "is" : "is not"} a file selected
      </Text> */}
      <Button
        onPress={async () => {
          doUpload();
        }}
        title="Upload"
        disabled={!uploadResult || !fileName}
      />
    </View>
  );
}

export default RecordScreen;
