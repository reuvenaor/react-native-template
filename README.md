This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# React Native Template with Redux Persist, Redux validation middleware

More features to be added soon

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Adding Schema for validationMiddleware:

Where IncrementByAmountPayload is the declared type (interface) somewhere in the app code. schema.json is the output file.

```bash
typescript-json-schema tsconfig.json IncrementByAmountPayload --out schema.json
```

You can use the output json file OR copy the output file content and export it in new ts file:

```typescript
export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  properties: {
    amount: {
      type: 'number',
    },
  },
  type: 'object',
};
```
