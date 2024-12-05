import {persistStore} from 'redux-persist';
import persistedReducer from './reducers';
import {createStore, StoreEnhancer, applyMiddleware, Middleware} from 'redux';
import {logger} from '../utils/logger';

// declare function applyMiddleware<Ext1, S>(middleware1: Middleware<Ext1, S, any>): StoreEnhancer<{
//     dispatch: Ext1;
// }>;
const middleware1: Middleware = store => {
  return next => action => {
    logger.info('action', action);
    let result = next(action);
    const state = store.getState();
    logger.info('state', state);
    return result;
  };
};

const storeEnhancer: StoreEnhancer = applyMiddleware(middleware1);

export const store = createStore(persistedReducer, storeEnhancer);

export const persistor = persistStore(store);
