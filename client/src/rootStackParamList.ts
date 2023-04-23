import { NavigatorScreenParams } from "@react-navigation/native";

import { SheetMusicDocumentEntity, UserEntity } from "../generated";

type RootStackParamList = {
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  MusicTab: NavigatorScreenParams<MusicTabParamList>;
  SocialTab: NavigatorScreenParams<SocialTabParamList>;
};

type HomeTabParamList = {
  Login: undefined;
  Home: undefined;
};

type MusicTabParamList = {
  SheetMusicBrowserScreen: { userId: number };
  UploadSheetMusicScreen: undefined;
  SheetMusicScreen: { id: number; name: string };
  EditSheetMusicScreen: { id: number; name: string };
};

type SocialTabParamList = {
  AllUsersScreen: undefined;
  UserProfileScreen: { user: UserEntity };
  RecordingsScreen: { userId: number };
  RecordScreen: { userId: number };
};

export {
  RootStackParamList,
  MusicTabParamList,
  HomeTabParamList,
  SocialTabParamList,
};
