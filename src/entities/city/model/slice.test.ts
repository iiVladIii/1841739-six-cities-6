import { cityReducer, cityActions } from './slice';
import { CitySchema } from './types/state';
import { CITY_NAME } from './consts/cities';

describe('citySlice', () => {
    describe('Initial State', () => {
        it('should return initial state with name null when no URL params', () => {
            const state = cityReducer(undefined, { type: '' });
            expect(state).toEqual({ name: null });
        });

        it('should set initial state from URL params if valid city', async () => {
            const mockLocation = new URL(`http://localhost?city=${CITY_NAME.Cologne}`);
            vi.stubGlobal('location', mockLocation);
            vi.resetModules();
            const { cityReducer: newReducer } = await import('./slice');
            const state = newReducer(undefined, { type: '' });
            expect(state.name).toBe(CITY_NAME.Cologne);
            vi.unstubAllGlobals();
        });
    });

    describe('setCity reducer', () => {
        it('should set city name when valid city provided', () => {
            const initialState: CitySchema = { name: null };
            const validCity = Object.values(CITY_NAME)[0];

            const state = cityReducer(
                initialState,
                cityActions.setCity(validCity),
            );

            expect(state.name).toBe(validCity);
        });

        it('should be case-insensitive when setting city', () => {
            const initialState: CitySchema = { name: null };
            const validCity = Object.values(CITY_NAME)[0];

            const state = cityReducer(
                initialState,
                cityActions.setCity(validCity.toUpperCase()),
            );

            expect(state.name).toBe(validCity);
        });

        it('should reset to initial state when invalid city provided', () => {
            const initialState: CitySchema = { name: CITY_NAME.Amsterdam};

            const state = cityReducer(
                initialState,
                cityActions.setCity('InvalidCity'),
            );

            expect(state.name).toBeNull();
        });

        it('should not change state when empty string provided', () => {
            const initialState: CitySchema = { name: CITY_NAME.Amsterdam };

            const state = cityReducer(
                initialState,
                cityActions.setCity(''),
            );

            expect(state.name).toBeNull();
        });
    });

    describe('resetCity reducer', () => {
        it('should reset city name to null', () => {
            const initialState: CitySchema = { name: CITY_NAME.Amsterdam};

            const state = cityReducer(
                initialState,
                cityActions.resetCity(),
            );

            expect(state.name).toBeNull();
        });

        it('should keep null if already null', () => {
            const initialState: CitySchema = { name: null };

            const state = cityReducer(
                initialState,
                cityActions.resetCity(),
            );

            expect(state.name).toBeNull();
        });
    });
});
