import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { Platform, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Document, Page, pdfjs } from "react-pdf";

import { RootStackParamList } from "../rootStackParamList";

function PdfViewer({ url }: { url: string }) {
  // Weird bug with pdf viewer not rendering after losing focus, so forcing to reload
  const [focusUrl, setUrl] = useState(url);
  useFocusEffect(
    useCallback(() => {
      setUrl(url!);
      return () => {
        setUrl(undefined);
      };
    }, [url])
  );

  return (
    <WebView
      javaScriptEnabled
      style={{ flex: 1 }}
      source={{ uri: focusUrl }}
      scrollEnabled
      pullToRefreshEnabled
    />
  );
}

export { PdfViewer };
