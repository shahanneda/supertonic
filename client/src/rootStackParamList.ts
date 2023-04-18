import { NavigatorScreenParams } from "@react-navigation/native";

import { SheetMusicDocumentEntity } from "../generated";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Upload: undefined;
  MusicTab: NavigatorScreenParams<MusicTabParamList>;
};

type MusicTabParamList = {
  SheetMusicScreen: { music: SheetMusicDocumentEntity };
  EditSheetMusicScreen: { music?: SheetMusicDocumentEntity };
};
export { RootStackParamList, MusicTabParamList };
