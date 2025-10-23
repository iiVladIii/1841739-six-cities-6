import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from './types';
import { cityReducer } from '@/entities/City';
import { offerReducer } from '@/entities/Offer';
import { $api } from '@/shared/api/api';
import { userReducer } from '@/entities/User';
import { apiErrorHandler } from '@/shared/types/api';

const reducers: ReducersMapObject<StateSchema> = {
    city: cityReducer,
    offer: offerReducer,
    user: userReducer,
};

export const reduxStore = configureStore({
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

export type AppDispatch = (typeof reduxStore)['dispatch'];
