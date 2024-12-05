import {applyMiddleware, StoreEnhancer} from '@reduxjs/toolkit';
import logger from 'redux-logger';

// declare function applyMiddleware<Ext1, S>(middleware1: Middleware<Ext1, S, any>): StoreEnhancer<{
//     dispatch: Ext1;
// }>;

export const storeEnhancer: StoreEnhancer = applyMiddleware(logger);

// Old:
// export const logMiddleware: Middleware = store => {
//   return next => action => {
//     logger.info('action', action);
//     let result = next(action);
//     const state = store.getState();
//     logger.info('state', state);
//     return result;
//   };
// };
