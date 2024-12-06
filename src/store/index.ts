import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {configureStore, ThunkAction, PayloadAction} from '@reduxjs/toolkit';
import {persistedCounterReducer} from './reducers';
import {storeEnhancer} from './middlewares/logMiddleware';
import {
  SchemasMap,
  validationMiddlewareCreator,
} from './middlewares/validationMiddleware';
import CounterSchema from './schemas/counterSchema.ts';

const schemas: SchemasMap = {
  'counter/incrementByAmount': CounterSchema,
  'counter/increment': {},
};

const validationEnhancer = validationMiddlewareCreator(schemas);

export const store = configureStore({
  reducer: {
    counter: persistedCounterReducer,
  },
  // If using Redux-Persist, you should specifically ignore all the action types it dispatches:
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat([storeEnhancer, validationEnhancer]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  PayloadAction<string>
>;
