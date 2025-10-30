export type { City } from './model/types/city';
export type { CitySchema } from './model/types/state';

export { CITY_NAME } from './model/consts/cities';
export { CITY_LOCATIONS } from './model/consts/city-locations';

export { cityReducer, cityActions } from './model/slice';

export { useCityName, getCityName } from './model/selectors';
