import { applyMiddleware, StoreEnhancer } from '@reduxjs/toolkit';
import logger from 'redux-logger';

export const storeEnhancer: StoreEnhancer = applyMiddleware(logger);
