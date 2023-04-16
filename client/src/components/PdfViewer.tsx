import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Platform, View } from "react-native";
import { Document, Page, pdfjs } from "react-pdf";

import { RootStackParamList } from "../rootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "PDF">;

function PdfViewer({ navigation, route }: Props) {
  if (!route.params.url) {
    return;
  }

  const { url } = route.params;
  console.log("URL is", url);

  if (Platform.OS === "web") {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    return (
      <div>
        <Document file={url}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  }

  return <View>{url}</View>;
}

export { PdfViewer };
