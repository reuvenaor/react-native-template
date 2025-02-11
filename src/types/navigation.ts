export enum SettingsScreenName {
  Settings = 'Settings',
}

export enum ExamplesListScreenName {
  ExamplesList = 'Examples List',
  ReduxExample = 'Redux Example',
}

export type SettingsStackParamList = {
  [SettingsScreenName.Settings]: undefined;
};

export type ExamplesListStackParamList = {
  [ExamplesListScreenName.ExamplesList]: undefined;
  [ExamplesListScreenName.ReduxExample]: undefined;
};

export enum TabsName {
  Settings = 'Settings Tab',
  ExamplesList = 'Examples List',
}

export type BottomTabParamList = {
  [TabsName.ExamplesList]: undefined;
  [TabsName.Settings]: undefined;
};
