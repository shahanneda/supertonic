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
      automaticallyAdjustContentInsets
      style={{
        flex: 1,
        width: "94%",
        alignItems: "center",
        justifyContent: "center",
        // TODO: fix this
        marginLeft: "3%",
      }}
      height="50%"
      source={{ uri: focusUrl }}
      scrollEnabled
      pullToRefreshEnabled
      // style={{ height, width, resizeMode: "cover", flex: 1 }}
      scalesPageToFit={false}
      onLoadEnd={this._onLoadEnd}
    />
  );
}

export { PdfViewer };
