import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import {
  useAppDispatch,
  useAppSelector,
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  selectCount,
} from 'md-redux-store';

export function CounterRedux() {
  const [incrementAmount, setIncrementAmount] = useState('2');
  const count = useAppSelector(selectCount);
  const status = useAppSelector(state => state.counter.status);
  const dispatch = useAppDispatch();
  const isLoading = status !== 'idle';

  return (
    <Card style={styles.container}>
      <Card.Title
        title="Redux Counter"
        subtitle="A React Native Paper Example"
      />
      <Card.Content>
        <Text variant="displayLarge" style={styles.value}>
          {count}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <IconButton
          icon="minus-circle-outline"
          size={32}
          onPress={() => dispatch(decrement())}
        />
        <IconButton
          icon="plus-circle-outline"
          size={32}
          onPress={() => dispatch(increment())}
        />
      </Card.Actions>
      <Divider style={styles.divider} />
      <Card.Content>
        <TextInput
          label="Amount"
          style={styles.textbox}
          value={incrementAmount}
          keyboardType="numeric"
          onChangeText={setIncrementAmount}
          mode="outlined"
        />
        <Button
          mode="contained"
          style={styles.actionButton}
          onPress={() =>
            dispatch(
              incrementByAmount({ amount: Number(incrementAmount) || 0 }),
            )
          }>
          Add Amount
        </Button>
        <Button
          mode="contained-tonal"
          style={styles.actionButton}
          loading={isLoading}
          disabled={isLoading}
          onPress={() =>
            dispatch(incrementAsync(Number(incrementAmount) || 0))
          }>
          Add Async
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  value: {
    textAlign: 'center',
    marginVertical: 16,
  },
  cardActions: {
    justifyContent: 'space-evenly',
  },
  divider: {
    marginVertical: 8,
  },
  textbox: {
    marginBottom: 16,
  },
  actionButton: {
    marginVertical: 4,
  },
});
