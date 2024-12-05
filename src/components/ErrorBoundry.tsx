import React, {PropsWithChildren, ReactNode} from 'react';
import {View, Text, DevSettings, Button} from 'react-native';
import {logger} from '../utils/logger';

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
    logger.error('error', error);
    logger.info('info', info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <View>
            <Text>Something went wrong. Check log </Text>
            <Button
              title="Reload"
              onPress={() => DevSettings.reload('ErrorBoundary')}
            />
          </View>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
