export type { City } from './model/types/city';
export type { CitySchema } from './model/types/state';

export { CITY_NAME } from './model/consts/Cities';
export { CITY_LOCATIONS } from './model/consts/CityLocations';

export { cityReducer, cityActions } from './model/slice';

export { useCityName, getCityName } from './model/selectors';
