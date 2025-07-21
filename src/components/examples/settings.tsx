import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Surface,
  Text,
  Switch,
  List,
  Divider,
  Avatar,
  Button,
  IconButton,
  Dialog,
  Portal,
  useTheme,
  ListIconProps,
} from 'react-native-paper';

type IconProps = Omit<ListIconProps, 'icon'>;

const renderSwitch = (value: boolean, onValueChange: (v: boolean) => void) => () => (
  <Switch value={value} onValueChange={onValueChange} />
);
const renderChevronIcon = (props: IconProps) => <IconButton {...props} icon="chevron-right" onPress={() => { }} />;
const renderThemeIcon = (props: IconProps) => <List.Icon {...props} icon="theme-light-dark" />;
const renderBellIcon = (props: IconProps) => <List.Icon {...props} icon="bell" />;
const renderChartBarIcon = (props: IconProps) => <List.Icon {...props} icon="chart-bar" />;
const renderDeleteIcon = (props: IconProps) => <List.Icon {...props} icon="delete" />;
const renderInfoIcon = (props: IconProps) => <List.Icon {...props} icon="information" />;
const renderHelpIcon = (props: IconProps) => <List.Icon {...props} icon="help-circle" />;

export default function Settings() {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  const [showAboutDialog, setShowAboutDialog] = useState(false);

  return (
    <>
      <Surface
        style={[
          styles.topContainer,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
        elevation={0}
      >
        <Text
          variant="labelLarge"
          style={[
            styles.headerTitle,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          App configuration example
        </Text>
      </Surface>

      <ScrollView style={[styles.scrollView, { backgroundColor: theme.colors.background }]}>
        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Dark Mode"
            description="Enable dark theme throughout the app"
            left={renderThemeIcon}
            right={renderSwitch(darkMode, setDarkMode)}
          />
          <Divider />

          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Push Notifications"
            description="Receive notifications for important updates"
            left={renderBellIcon}
            right={renderSwitch(notifications, setNotifications)}
          />
          <Divider />

          <List.Subheader>Privacy</List.Subheader>
          <List.Item
            title="Data Collection"
            description="Allow anonymous usage data collection to improve the app"
            left={renderChartBarIcon}
            right={renderSwitch(dataCollection, setDataCollection)}
          />
          <List.Item
            title="Clear Chat History"
            description="Remove all previous conversations"
            left={renderDeleteIcon}
            right={renderChevronIcon}
          />
          <Divider />

          <List.Subheader>About</List.Subheader>
          <List.Item
            title="App Version"
            description="1.0.0"
            left={renderInfoIcon}
          />
          <List.Item
            title="About This App"
            description="Learn more about the application"
            left={renderHelpIcon}
            onPress={() => setShowAboutDialog(true)}
          />
        </List.Section>
      </ScrollView>

      <Portal>
        <Dialog visible={showAboutDialog} onDismiss={() => setShowAboutDialog(false)}>
          <Dialog.Title>About</Dialog.Title>
          <Dialog.Content>
            <View style={styles.aboutContent}>
              <Avatar.Icon
                size={60}
                icon="brain"
                style={[{ backgroundColor: theme.colors.primary }, styles.avatarIcon]}
                color={theme.colors.onPrimary}
              />
              <Text variant="bodyMedium" style={styles.aboutText}>
                This React Native application demonstrates integration with on-device AI models using ExecuTorch.
                It showcases various features including chat interface, state management with Redux, and UI components with React Native Paper.
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAboutDialog(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    height: 68,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerTitle: {
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  aboutContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  aboutText: {
    textAlign: 'center',
    lineHeight: 20,
  },
  avatarIcon: {
    marginBottom: 16,
  },
});
