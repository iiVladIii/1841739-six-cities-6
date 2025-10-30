import { StateSchema } from '@/app/providers/store';
import { useSelector } from 'react-redux';

export const getCityName = (state: StateSchema) => state.city.name;

export function useCityName() {
    return useSelector(getCityName);
}
