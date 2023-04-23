import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  EncodingType,
  FileSystemSessionType,
  readAsStringAsync,
  downloadAsync,
  cacheDirectory,
  documentDirectory,
} from "expo-file-system";
import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  StyleSheet,
  Platform,
  Pressable,
  View,
} from "react-native";
import { Document, Page, pdfjs } from "react-pdf";

import { SheetMusicPageEntity, SheetMusicService } from "../../../generated";
import { PdfViewer } from "../../components/PdfViewer";
import {
  MusicTabParamList,
  RootStackParamList,
} from "../../rootStackParamList";

type Props = NativeStackScreenProps<MusicTabParamList, "SheetMusicScreen">;

function SheetMusicScreen({ navigation, route }: Props) {
  console.log(route.params);
  console.log("In sheet music screen");
  const [pages, setPages] = useState<SheetMusicPageEntity[]>([]);
  const { id, name } = route.params;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (id) {
      console.log("makiing api call", id);
      SheetMusicService.getPagesForSheetMusic(id).then((data) => {
        setPages(data);
      });
    }
  }, [id]);

  if (!route.params.id || !pages || pages.length === 0) {
    console.log("early return");
    return;
  }
  navigation.setOptions({ headerTitle: name });
  // console.log(pages);
  // console.log(pages[currentPage].url);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text>
          Page {currentPage + 1} / {pages.length}{" "}
        </Text>
      </View>
      <View
        style={{
          height: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          width: "100%",
          // alignItems: "center",
        }}
      >
        <PdfViewer url={pages[currentPage].url} />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <PageFlipper
          onPress={() => {
            setCurrentPage(mod(currentPage - 1, pages.length));
          }}
        />
        <PageFlipper
          onPress={() => {
            setCurrentPage(mod(currentPage + 1, pages.length));
          }}
        />
      </View>
    </View>
  );
}

function SheetMusicScreenHeaderRight() {
  const route = useRoute<RouteProp<MusicTabParamList, "SheetMusicScreen">>();
  const { id, name } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Button
      title="Edit"
      onPress={() => {
        navigation.navigate("MusicTab", {
          screen: "EditSheetMusicScreen",
          params: { id, name },
        });
      }}
    />
  );
}
const PageFlipper = ({ onPress }: { onPress: () => void }) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 4,
      elevation: 3,
      // backgroundColor: "black",
      height: "100%",
      width: "40%",
    },
  });

  return <Pressable style={styles.button} onPress={onPress} />;
};

// Javascript mod is broken for negative numbers
function mod(a, n) {
  return a - n * Math.floor(a / n);
}

export { SheetMusicScreen, SheetMusicScreenHeaderRight };

async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (_e) => resolve(reader.result as string);
    reader.onerror = (_e) => reject(reader.error);
    reader.onabort = (_e) => reject(new Error("Read aborted"));
    reader.readAsDataURL(blob);
  });
}
