import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {counterReducer, CounterState} from './counterReducer';
import {AnyAction} from '@reduxjs/toolkit';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedCounterReducer = persistReducer<CounterState, AnyAction>(
  rootPersistConfig,
  counterReducer,
);

export {persistedCounterReducer};
