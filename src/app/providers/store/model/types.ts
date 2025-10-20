import { CitySchema } from '@/entities/City';
import { OfferSchema } from '@/entities/Offer';
import { AxiosInstance } from 'axios';

export interface StateSchema {
    city: CitySchema;
    offer: OfferSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
