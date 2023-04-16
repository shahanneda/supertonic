import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Platform, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Document, Page, pdfjs } from "react-pdf";

import { RootStackParamList } from "../rootStackParamList";

function PdfViewer({ url }: { url: string }) {
  return (
    // <View>
    <WebView javaScriptEnabled style={{ flex: 1 }} source={{ uri: url }} />
    // {/* <Text>{url}</Text> */}
    // {/* </View> */}
  );
}

export { PdfViewer };
