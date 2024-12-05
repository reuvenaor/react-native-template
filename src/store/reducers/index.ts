import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction, combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import profileReducer from './profile';
import expensesReducer from './expenses';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  profile: profileReducer,
  expenses: expensesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState, AnyAction>(
  rootPersistConfig,
  rootReducer,
);

export default persistedReducer;
