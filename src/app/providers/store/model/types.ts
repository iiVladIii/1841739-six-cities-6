import { CitySchema } from '@/entities/City';
import { OfferSchema } from '@/entities/Offer';
import { AxiosInstance } from 'axios';
import { UserSchema } from '@/entities/User';

export interface StateSchema {
    city: CitySchema;
    offer: OfferSchema;
    user: UserSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
