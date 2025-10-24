import { CitySchema } from '@/entities/city';
import { OfferSchema } from '@/entities/offer';
import { AxiosInstance } from 'axios';
import { UserSchema } from '@/entities/user';
import { ServerError } from '@/shared/types/api';

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
