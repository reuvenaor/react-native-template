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
} from 'react-native-paper';

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
          { backgroundColor: theme.colors.surfaceVariant }
        ]}
        elevation={0}
      >
        <Text
          variant="labelLarge"
          style={[
            styles.headerTitle,
            { color: theme.colors.onSurfaceVariant }
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
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={props => <Switch value={darkMode} onValueChange={setDarkMode} />}
          />
          <Divider />

          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Push Notifications"
            description="Receive notifications for important updates"
            left={props => <List.Icon {...props} icon="bell" />}
            right={props => <Switch value={notifications} onValueChange={setNotifications} />}
          />
          <Divider />

          <List.Subheader>Privacy</List.Subheader>
          <List.Item
            title="Data Collection"
            description="Allow anonymous usage data collection to improve the app"
            left={props => <List.Icon {...props} icon="chart-bar" />}
            right={props => <Switch value={dataCollection} onValueChange={setDataCollection} />}
          />
          <List.Item
            title="Clear Chat History"
            description="Remove all previous conversations"
            left={props => <List.Icon {...props} icon="delete" />}
            right={props => <IconButton icon="chevron-right" onPress={() => { }} />}
          />
          <Divider />

          <List.Subheader>About</List.Subheader>
          <List.Item
            title="App Version"
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
          <List.Item
            title="About This App"
            description="Learn more about the application"
            left={props => <List.Icon {...props} icon="help-circle" />}
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
                style={{ backgroundColor: theme.colors.primary, marginBottom: 16 }}
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
});
