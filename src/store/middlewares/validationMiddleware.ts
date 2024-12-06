import {applyMiddleware, Middleware, StoreEnhancer} from '@reduxjs/toolkit';
import {JsonSchema, validate} from 'tv4';
import {logger} from '../../utils/logger';

export type SchemasMap = Record<string, JsonSchema>;

// declare function applyMiddleware<Ext1, S>(middleware1: Middleware<Ext1, S, any>): StoreEnhancer<{
//     dispatch: Ext1;
// }>;

export const validationMiddlewareCreator = (
  schemas: SchemasMap,
): StoreEnhancer => {
  const validationMiddleware: Middleware = _store => {
    // validation state against schema:
    // validate(store.getState(), schema-generated-from-RootState) is the state of the store

    // validation action payload against schema
    return next => (action: any) => {
      const result = next(action);
      if (
        action?.type &&
        schemas[action.type] &&
        !validate(action.payload, schemas[action.type])
      ) {
        logger.warn('Invalid action schema detected:', action);
      }
      return result;
    };

    // TBD: create schema at build time with a script
    // https://www.npmjs.com/package/typescript-json-schema - #Programmatic use
  };
  return applyMiddleware(validationMiddleware);
};
