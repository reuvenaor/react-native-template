export enum SettingsScreenName {
  Settings = 'Settings',
}

export enum ExamplesListScreenName {
  ExamplesList = 'ExamplesList',
  ReduxExample = 'ReduxExample',
}

export type SettingsStackParamList = {
  [SettingsScreenName.Settings]: undefined;
};

export type ExamplesListStackParamList = {
  [ExamplesListScreenName.ExamplesList]: undefined;
  [ExamplesListScreenName.ReduxExample]: undefined;
};

export enum TabsName {
  SettingsTab = 'SettingsTab',
  ExamplesList = 'ExamplesList',
}

export type BottomTabParamList = {
  [TabsName.ExamplesList]: undefined;
  [TabsName.SettingsTab]: undefined;
};
