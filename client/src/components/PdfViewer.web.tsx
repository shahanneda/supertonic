import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { Document, Page, pdfjs } from "react-pdf";

// import { Document } from 'react-pdf'.
import { RootStackParamList } from "../rootStackParamList";

function PdfViewer({ url }: { url: string }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const ref = useRef();

  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    // @ts-ignore weird hack we have to do to set the height on web
    if (ref && ref.current && ref.current.clientHeight) {
      // @ts-ignore
      setHeight(ref.current.clientHeight);
      // @ts-ignore
      setWidth(ref.current.clientWidth);
    }
  }, [ref]);

  return (
    <div style={{ flex: 1, height: "100%", width: "100%" }} ref={ref}>
      <Document file={url}>
        <Page
          pageNumber={1}
          width={width < height ? width : undefined}
          height={height < width ? height : undefined}
          customTextRenderer={(props: any) => {
            return "";
          }}
        />
      </Document>
    </div>
  );
}

export { PdfViewer };
