const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Define paths
const SRC_DIR = path.join(__dirname, '..', 'src');
const COMPONENTS_CHAT_DIR = path.join(SRC_DIR, 'components', 'examples', 'chat-ai');
const FEATURES_DIR = path.join(SRC_DIR, 'features');
const CHAT_FEATURE_DIR = path.join(FEATURES_DIR, 'chat-ai');
const NAVIGATION_FILE = path.join(SRC_DIR, 'tabs', 'examples-list-tab.tsx');
const PACKAGE_JSON = path.join(__dirname, '..', 'package.json');
const TYPES_FILE = path.join(SRC_DIR, 'types', 'navigation.ts');

// Ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Check if executorch dependency is installed with correct version
function isExecutorchInstalled() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
    const installedVersion = packageJson.dependencies && packageJson.dependencies['react-native-executorch'];
    return installedVersion === '0.4.6';
  } catch (error) {
    console.error('Error checking executorch installation:', error);
    return false;
  }
}

// Install executorch dependency
function installExecutorch() {
  try {
    console.log('Installing react-native-executorch v0.4.6 dependency...');
    execSync('npm install react-native-executorch@0.4.6 --save --legacy-peer-deps', { stdio: 'inherit' });
    console.log('Installed react-native-executorch v0.4.6 successfully.');
  } catch (error) {
    console.error('Error installing react-native-executorch:', error);
    throw error;
  }
}

// Uninstall executorch dependency
function uninstallExecutorch() {
  try {
    console.log('Uninstalling react-native-executorch dependency...');
    execSync('npm uninstall react-native-executorch --save --legacy-peer-deps', { stdio: 'inherit' });
    console.log('Uninstalled react-native-executorch successfully.');
  } catch (error) {
    console.error('Error uninstalling react-native-executorch:', error);
    throw error;
  }
}

// Create a user prompt
function createPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return {
    ask: (question) => new Promise(resolve => rl.question(question, resolve)),
    close: () => rl.close()
  };
}

// Enable the Chat feature
async function enableChatFeature() {
  // Create features directory if it doesn't exist
  ensureDirectoryExists(FEATURES_DIR);
  ensureDirectoryExists(CHAT_FEATURE_DIR);
  ensureDirectoryExists(path.join(CHAT_FEATURE_DIR, 'components'));
  ensureDirectoryExists(path.join(CHAT_FEATURE_DIR, 'screens'));

  // Move chat components to feature directory
  if (fs.existsSync(COMPONENTS_CHAT_DIR)) {
    const files = fs.readdirSync(COMPONENTS_CHAT_DIR);
    files.forEach(file => {
      const sourceFile = path.join(COMPONENTS_CHAT_DIR, file);
      const targetFile = path.join(CHAT_FEATURE_DIR, 'components', file);
      fs.copyFileSync(sourceFile, targetFile);
    });
  } else {
    console.log('Warning: Chat components directory not found. Creating structure only.');
  }

  // Create chat screen in feature directory
  const chatScreenContent = `import React from 'react';
import ChatAI from '../components';

export default function ChatScreen() {
  return <ChatAI />;
}
`;

  fs.writeFileSync(
    path.join(CHAT_FEATURE_DIR, 'screens', 'chat-screen.tsx'),
    chatScreenContent
  );

  // Create feature index file
  const featureIndexContent = `import ChatScreen from './screens/chat-screen';

export { ChatScreen };
`;

  fs.writeFileSync(
    path.join(CHAT_FEATURE_DIR, 'index.ts'),
    featureIndexContent
  );

  // Update navigation file
  try {
    let navigationContent = fs.readFileSync(NAVIGATION_FILE, 'utf8');
    
    // Check if ChatScreen import needs to be updated
    if (navigationContent.includes('import ChatScreen from \'../screens/chat-screen\';')) {
      navigationContent = navigationContent.replace(
        /import ChatScreen from ['"]\.\.\/screens\/chat-screen['"];/,
        `import { ChatScreen } from '../features/chat-ai';`
      );
      fs.writeFileSync(NAVIGATION_FILE, navigationContent);
      console.log('Updated navigation imports successfully.');
    } else {
      console.log('Navigation file already has the correct import or has a different structure.');
    }
  } catch (error) {
    console.error('Error updating navigation file:', error);
    console.log('You may need to manually update the import in', NAVIGATION_FILE);
  }

  // Check if executorch is installed with the correct version
  try {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
    const installedVersion = packageJson.dependencies && packageJson.dependencies['react-native-executorch'];
    
    if (!installedVersion) {
      console.log('react-native-executorch is not installed. Installing version 0.4.6...');
      installExecutorch();
    } else if (installedVersion !== '0.4.6') {
      console.log(`Detected react-native-executorch version ${installedVersion}, but version 0.4.6 is required.`);
      console.log('Reinstalling with the correct version...');
      uninstallExecutorch();
      installExecutorch();
    } else {
      console.log('react-native-executorch v0.4.6 is already installed.');
    }
  } catch (error) {
    console.error('Error checking package.json:', error);
    installExecutorch();
  }

  console.log('Chat AI feature enabled successfully!');
}

// Disable the Chat feature
async function disableChatFeature() {
  // Update navigation file to use stub chat component
  try {
    let navigationContent = fs.readFileSync(NAVIGATION_FILE, 'utf8');
    
    // Create a stub chat screen
    const stubChatDir = path.join(SRC_DIR, 'screens');
    ensureDirectoryExists(stubChatDir);
    
    // Use a simple approach without newline characters in JSX
    const stubChatContent = `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Feature Not Available</Text>
      <Text style={styles.description}>
        To enable this feature, run the following command:
      </Text>
      <TouchableOpacity>
        <Text style={styles.command}>npm run features:enable-chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  command: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 5,
  }
});
`;

    fs.writeFileSync(
      path.join(stubChatDir, 'chat-screen.tsx'),
      stubChatContent
    );
    
    // Update import in navigation
    if (navigationContent.includes('import { ChatScreen } from \'../features/chat-ai\';')) {
      navigationContent = navigationContent.replace(
        /import \{ ChatScreen \} from ['"]\.\.\/features\/chat-ai['"];/,
        `import ChatScreen from '../screens/chat-screen';`
      );
      fs.writeFileSync(NAVIGATION_FILE, navigationContent);
      console.log('Updated navigation imports to use stub implementation.');
    } else {
      console.log('Navigation file already using stub implementation or has a different structure.');
    }
    
    // Ask if executorch should be uninstalled
    const prompt = createPrompt();
    const response = await prompt.ask('Do you want to uninstall the react-native-executorch dependency? (y/N): ');
    prompt.close();
    
    if (response.toLowerCase() === 'y') {
      uninstallExecutorch();
    }
    
    console.log('Chat AI feature disabled successfully!');
  } catch (error) {
    console.error('Error disabling Chat AI feature:', error);
  }
}

// Main function
async function main() {
  const action = process.argv[2];
  
  if (action === '--enable') {
    await enableChatFeature();
  } else if (action === '--disable') {
    await disableChatFeature();
  } else {
    const prompt = createPrompt();
    const response = await prompt.ask('Do you want to enable the Chat AI feature? (Y/n): ');
    prompt.close();
    
    if (response.toLowerCase() !== 'n') {
      await enableChatFeature();
    } else {
      await disableChatFeature();
    }
  }
}

main().catch(console.error); 