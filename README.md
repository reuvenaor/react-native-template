A new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

[![expo](https://img.shields.io/badge/expo-53.0.8-blue)](https://expo.dev/)
[![react](https://img.shields.io/badge/react-19.0.0-blue)](https://reactjs.org/)
[![react-native](https://img.shields.io/badge/react--native-0.79.2-blue)](https://reactnative.dev/)

# React Native Template Expo Modules

This project includes Expo modules support to leverage the best of both worlds. This hybrid approach allows us to:

- Use Expo's pre-built native modules without ejecting
- Maintain full control over native code when needed
- Access Expo's development tools and services
- Easily integrate new Expo modules as they become available

This template implements the following libraries with examples and configurations:

Navigation:

[![@react-navigation/native](https://img.shields.io/badge/@react--navigation/native-^6.x-blue)](https://reactnavigation.org/docs/getting-started/)
[![@react-navigation/native-stack](https://img.shields.io/badge/@react--navigation/native--stack-^6.x-blue)](https://reactnavigation.org/docs/stack-navigator/)
[![@react-navigation/bottom-tabs](https://img.shields.io/badge/@react--navigation/bottom--tabs-^6.6.1-blue)](https://reactnavigation.org/docs/bottom-tab-navigator/)

Animation and UI:

[![react-native-safe-area-context](https://img.shields.io/badge/react--native--safe--area--context-5.4.0-blue)](https://github.com/th3rdwave/react-native-safe-area-context)
[![react-native-reanimated](https://img.shields.io/badge/react--native--reanimated-~3.17.4-blue)](https://docs.swmansion.com/react-native-reanimated/)
[![@shopify/react-native-skia](https://img.shields.io/badge/@shopify/react--native--skia-2.0.0--next.2-blue)](https://shopify.github.io/react-native-skia/)
[![@react-native-vector-icons](https://img.shields.io/badge/@react--native--vector--icons/common-^11.0.0-blue)](https://github.com/oblador/react-native-vector-icons)

Capabilities:

[![react-native-sensors](https://img.shields.io/badge/react--native--sensors-~7.3.6-blue)](https://github.com/react-native-sensors/react-native-sensors)
[![react-native-gesture-handler](https://img.shields.io/badge/react--native--gesture--handler-~2.24.0-blue)](https://docs.swmansion.com/react-native-gesture-handler/)

State Management:

[![@reduxjs/toolkit](https://img.shields.io/badge/@reduxjs/toolkit-^2.4.0-blue)](https://redux-toolkit.js.org/)
[![react-redux](https://img.shields.io/badge/react--redux-^9.1.2-blue)](https://react-redux.js.org/)
[![redux-logger](https://img.shields.io/badge/redux--logger-^3.0.6-blue)](https://github.com/LogRocket/redux-logger)
[![redux-persist](https://img.shields.io/badge/redux--persist-^6.0.0-blue)](https://github.com/rt2zz/redux-persist)
[![@react-native-async-storage/async-storage](https://img.shields.io/badge/@react--native--async--storage/async--storage-2.1.2-blue)](https://react-native-async-storage.github.io/async-storage/)

Performance:

[![@shopify/flash-list](https://img.shields.io/badge/@shopify/flash--list-1.7.6-blue)](https://shopify.github.io/flash-list/)
[![react-native-fast-image](https://img.shields.io/badge/react--native--fast--image-^8.6.3-blue)](https://github.com/DylanVann/react-native-fast-image)

AI with ExecuTorch (with patch for RN 0.79)

[![react-native-executorch](https://img.shields.io/badge/react--native--executorch-^0.3.2-blue)](https://github.com/pytorch/executorch)


## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

Install dependencies:

```bash
npm install --legacy-peer-deps
```

### For Android

```bash
npm run android
```

### For iOS

First, install the pods:

```bash
npm run ios:pod-install
```

Then, run the iOS app:

```bash
npm run ios
```

### Additional Commands

```bash
# Check Expo installation
npm run expo:doctor

# Check for package updates
npm run expo:check

# Clean and refresh the project
npm run refresh

# Clean iOS build
npm run ios:clean

# Clean Android build
npm run android:clean

# Get iOS devices
npm run ios:devices

# Get Android devices
npm run android:devices
```



## License

MIT
