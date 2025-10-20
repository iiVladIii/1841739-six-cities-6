import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './types';
import { cityReducer } from '@/entities/City';
import { offerReducer } from '@/entities/Offer';
import { $api } from '@/shared/api/api';
import { userReducer } from '@/entities/User';

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
                },
            },
        }),
});

export type AppDispatch = (typeof reduxStore)['dispatch'];
