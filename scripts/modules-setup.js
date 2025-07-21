const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');
const modules = require('../modules.json');

// Define paths
const PROJECT_ROOT = path.join(__dirname, '..');
const MODULES_DIR = path.join(PROJECT_ROOT, 'modules');
const PACKAGE_JSON = path.join(PROJECT_ROOT, 'package.json');

// Module configurations
const MODULES = {
  [modules.screens.CHAT_AI_SCREEN]: {
    path: path.join(MODULES_DIR, 'chat-ai-screen'),
    dependencies: ['react-native-executorch@0.4.6'],
  },
  [modules.screens.REDUX_SCREEN]: {
    path: path.join(MODULES_DIR, 'redux-screen'),
    dependencies: [],
  },
  [modules.screens.SKIA_SCREEN]: {
    path: path.join(MODULES_DIR, 'skia-accelerometer-screen'),
    dependencies: [],
  },
};

// Link a module by installing it locally
function linkModule(moduleName) {
  const moduleConfig = MODULES[moduleName];
  if (!moduleConfig) {
    throw new Error(`Unknown module: ${moduleName}`);
  }

  try {
    console.log(`Linking module: ${moduleName}...`);
    execSync(`npm install ${moduleConfig.path} --save --legacy-peer-deps`, {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
    });
    console.log(`Module ${moduleName} linked successfully.`);
  } catch (error) {
    console.error(`Error linking module ${moduleName}:`, error);
    throw error;
  }
}

// Unlink a module by uninstalling it
function unlinkModule(moduleName) {
  const moduleConfig = MODULES[moduleName];
  if (!moduleConfig) {
    throw new Error(`Unknown module: ${moduleName}`);
  }

  try {
    console.log(`Unlinking module: ${moduleName}...`);
    execSync(`npm uninstall ${moduleName} --save --legacy-peer-deps`, {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
    });
    console.log(`Module ${moduleName} unlinked successfully.`);
  } catch (error) {
    console.error(`Error unlinking module ${moduleName}:`, error);
    throw error;
  }
}

// Install dependencies for a module
function installDependencies(moduleName) {
  const moduleConfig = MODULES[moduleName];
  if (!moduleConfig || !moduleConfig.dependencies.length) {
    return;
  }

  try {
    console.log(`Installing dependencies for ${moduleName}...`);
    for (const dep of moduleConfig.dependencies) {
      console.log(`Installing ${dep}...`);
      execSync(`npm install ${dep} --save --legacy-peer-deps`, {
        stdio: 'inherit',
        cwd: PROJECT_ROOT,
      });
    }
    console.log(`Dependencies for ${moduleName} installed successfully.`);

    // Run iOS pod install automatically when dependencies are installed
    runIosPodInstall();
  } catch (error) {
    console.error(`Error installing dependencies for ${moduleName}:`, error);
    throw error;
  }
}

// Run iOS pod install
function runIosPodInstall() {
  try {
    console.log('\n🍎 Running iOS pod install...');
    execSync('npm run ios:pod-install', {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
    });
    console.log('iOS pod install completed successfully.\n');
  } catch (error) {
    console.error('Error running iOS pod install:', error.message);
    console.log('You may need to run it manually: npm run ios:pod-install\n');
  }
}

// Uninstall dependencies for a module
function uninstallDependencies(moduleName) {
  const moduleConfig = MODULES[moduleName];
  if (!moduleConfig || !moduleConfig.dependencies.length) {
    return;
  }

  try {
    console.log(`Uninstalling dependencies for ${moduleName}...`);
    for (const dep of moduleConfig.dependencies) {
      const depName = dep.split('@')[0]; // Remove version specifier
      console.log(`Uninstalling ${depName}...`);
      execSync(`npm uninstall ${depName} --save --legacy-peer-deps`, {
        stdio: 'inherit',
        cwd: PROJECT_ROOT,
      });
    }
    console.log(`Dependencies for ${moduleName} uninstalled successfully.`);

    // Run iOS pod install automatically when dependencies are uninstalled
    runIosPodInstall();
  } catch (error) {
    console.error(`Error uninstalling dependencies for ${moduleName}:`, error);
    throw error;
  }
}

// Check if a module is currently linked
function isModuleLinked(moduleName) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
    return !!(packageJson.dependencies && packageJson.dependencies[moduleName]);
  } catch (error) {
    console.error('Error checking package.json:', error);
    return false;
  }
}

// Create a user prompt
function createPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return {
    ask: question => new Promise(resolve => rl.question(question, resolve)),
    close: () => rl.close(),
  };
}

// Enable modules
async function enableModules(moduleNames) {
  console.log(`Enabling modules: ${moduleNames.join(', ')}`);

  for (const moduleName of moduleNames) {
    if (!MODULES[moduleName]) {
      console.error(`Unknown module: ${moduleName}`);
      continue;
    }

    if (isModuleLinked(moduleName)) {
      console.log(`Module ${moduleName} is already linked.`);
    } else {
      linkModule(moduleName);
    }

    installDependencies(moduleName);
  }

  console.log('Modules enabled successfully!');
}

// Disable modules
async function disableModules(moduleNames) {
  console.log(`Disabling modules: ${moduleNames.join(', ')}`);

  for (const moduleName of moduleNames) {
    if (!MODULES[moduleName]) {
      console.error(`Unknown module: ${moduleName}`);
      continue;
    }

    if (!isModuleLinked(moduleName)) {
      console.log(`Module ${moduleName} is already unlinked.`);
    } else {
      unlinkModule(moduleName);
    }

    // Ask before uninstalling dependencies (especially for md-chat-ai-screen with executorch)
    if (MODULES[moduleName].dependencies.length > 0) {
      const prompt = createPrompt();
      const response = await prompt.ask(
        `Do you want to uninstall dependencies for ${moduleName}? (y/N): `
      );
      prompt.close();

      if (response.toLowerCase() === 'y') {
        uninstallDependencies(moduleName);
      }
    }
  }

  console.log('Modules disabled successfully!');
}

// Show module status
function showModuleStatus() {
  console.log('\nModule Status:');
  console.log('==============');

  for (const [moduleName, config] of Object.entries(MODULES)) {
    const isLinked = isModuleLinked(moduleName);
    const status = isLinked ? '✅ LINKED' : '❌ UNLINKED';
    console.log(`${moduleName}: ${status}`);

    if (config.dependencies.length > 0) {
      console.log(`  Dependencies: ${config.dependencies.join(', ')}`);
    }
  }
  console.log('');
}

// Main function
async function main() {
  const action = process.argv[2];
  const moduleArg = process.argv[3];

  if (action === '--status') {
    showModuleStatus();
    return;
  }

  if (action === '--enable') {
    if (moduleArg === 'all') {
      await enableModules(Object.keys(MODULES));
    } else if (moduleArg && MODULES[moduleArg]) {
      await enableModules([moduleArg]);
    } else {
      console.log('Available modules:', Object.keys(MODULES).join(', '));
      console.log('Usage: node modules-setup.js --enable <module-name|all>');
    }
    return;
  }

  if (action === '--disable') {
    if (moduleArg === 'all') {
      await disableModules(Object.keys(MODULES));
    } else if (moduleArg && MODULES[moduleArg]) {
      await disableModules([moduleArg]);
    } else {
      console.log('Available modules:', Object.keys(MODULES).join(', '));
      console.log('Usage: node modules-setup.js --disable <module-name|all>');
    }
    return;
  }

  // Interactive mode
  console.log('\n🔧 Module Setup Tool');
  console.log('===================');
  showModuleStatus();

  const prompt = createPrompt();

  console.log('Options:');
  console.log('1. Enable specific module(s)');
  console.log('2. Disable specific module(s)');
  console.log('3. Enable all modules');
  console.log('4. Disable all modules');
  console.log('5. Exit');

  const choice = await prompt.ask('Choose an option (1-5): ');

  switch (choice) {
    case '1':
      const enableModule = await prompt.ask(
        `Enter module name (${Object.keys(MODULES).join(', ')}): `
      );
      if (MODULES[enableModule]) {
        await enableModules([enableModule]);
      } else {
        console.log('Invalid module name');
      }
      break;
    case '2':
      const disableModule = await prompt.ask(
        `Enter module name (${Object.keys(MODULES).join(', ')}): `
      );
      if (MODULES[disableModule]) {
        await disableModules([disableModule]);
      } else {
        console.log('Invalid module name');
      }
      break;
    case '3':
      await enableModules(Object.keys(MODULES));
      break;
    case '4':
      await disableModules(Object.keys(MODULES));
      break;
    case '5':
      console.log('Exiting...');
      break;
    default:
      console.log('Invalid choice');
  }

  prompt.close();
}

main().catch(console.error);
