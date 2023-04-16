import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Platform, View } from "react-native";
import { Document, Page, pdfjs } from "react-pdf";

import { RootStackParamList } from "../rootStackParamList";

function PdfViewer({ url }: { url: string }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  return (
    <div>
      <Document file={url}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export { PdfViewer };
