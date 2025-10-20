import { CitySchema } from '@/entities/City';
import { OfferSchema } from '@/entities/Offer';
import { AxiosInstance } from 'axios';
import { UserSchema } from '@/entities/User';
import { ServerError } from '@/shared/types/api.ts';

export interface StateSchema {
    city: CitySchema;
    offer: OfferSchema;
    user: UserSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    errorHandler: (err: unknown) => ServerError;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
