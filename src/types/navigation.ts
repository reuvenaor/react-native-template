export enum SettingsScreenName {
  Settings = 'Settings',
}

export enum ExamplesListScreenName {
  ExamplesList = 'Examples List',
  ReduxExample = 'Redux Example',
  SkiaAccelerometer = 'Skia Accelerometer',
}

export type SettingsStackParamList = {
  [SettingsScreenName.Settings]: undefined;
};

export type ExamplesListStackParamList = {
  [ExamplesListScreenName.ExamplesList]: undefined;
  [ExamplesListScreenName.ReduxExample]: undefined;
  [ExamplesListScreenName.SkiaAccelerometer]: undefined;
};

export enum TabsName {
  Settings = 'Settings Tab',
  ExamplesList = 'Examples List Tab',
}

export type BottomTabParamList = {
  [TabsName.ExamplesList]: undefined;
  [TabsName.Settings]: undefined;
};
