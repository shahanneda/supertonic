import { NavigatorScreenParams } from "@react-navigation/native";

import { SheetMusicDocumentEntity, UserEntity } from "../generated";

type RootStackParamList = {
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  MusicTab: NavigatorScreenParams<MusicTabParamList>;
  SocialTab: NavigatorScreenParams<SocialTabParamList>;
};

type HomeTabParamList = {
  Upload: undefined;
  Login: undefined;
  Home: undefined;
};

type MusicTabParamList = {
  SheetMusicScreen: { music: SheetMusicDocumentEntity };
  EditSheetMusicScreen: { music?: SheetMusicDocumentEntity };
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
