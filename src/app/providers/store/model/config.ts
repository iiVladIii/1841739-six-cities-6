import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from './types';
import { cityReducer } from '@/entities/city';
import { offerReducer } from '@/entities/offer';
import { $api } from '@/shared/api/api';
import { userReducer } from '@/entities/user';
import { apiErrorHandler } from '@/shared/types/api';

const reducers: ReducersMapObject<StateSchema> = {
    city: cityReducer,
    offer: offerReducer,
    user: userReducer,
};

export const reduxStore = (initialState?: StateSchema) =>
    configureStore({
        preloadedState: initialState,
        reducer: reducers,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                        errorHandler: apiErrorHandler,
                    } as ThunkExtraArg,
                },
            }),
    });

export type AppDispatch = ReturnType<typeof reduxStore>['dispatch'];
