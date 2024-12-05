import React, {PropsWithChildren, ReactNode} from 'react';
import {View, Text} from 'react-native';

type ErrorBoundaryProps = PropsWithChildren<{fallback?: ReactNode}>;

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  {hasError: boolean}
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: any) {
    console.log('getDerivedStateFromError error', error);
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: any, info: any) {
    console.log('componentDidCatch error', error);
    console.log('componentDidCatch info', info);
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <View>
            <Text>Something went wrong.</Text>
          </View>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
