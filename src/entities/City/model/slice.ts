import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitySchema } from './types/state';
import { CITY_NAME } from './consts/Cities';

const initialState: CitySchema = {
    name: CITY_NAME.Paris,
};

const availableCity = (string?: string): CITY_NAME | null => {
    if (string) {
        const city = Object.values(CITY_NAME).filter(
            (v) => v.toLowerCase() === string.toLowerCase(),
        );
        if (city[0]) return city[0];
        return null;
    }
    return null;
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<string>) => {
            const cityName = availableCity(action.payload);
            if (cityName) {
                state.name = cityName;
            } else {
                state.name = initialState.name;
            }
        },
    },
});

export const cityActions = citySlice.actions;
export const cityReducer = citySlice.reducer;
