import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

interface NotFoundScreenProps {
  moduleName?: string;
}

const NotFoundScreen = ({ moduleName = 'unknown' }: NotFoundScreenProps) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Module Not Found
          </Text>
          <Text variant="bodyMedium" style={styles.message}>
            Screen module need to be linked: {moduleName}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
  },
});

export default NotFoundScreen;
