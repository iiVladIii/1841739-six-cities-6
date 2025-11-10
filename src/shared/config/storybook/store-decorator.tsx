import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema, StoreProvider } from '@/app/providers/store';

export const StoreDecorator =
    (state?: DeepPartial<StateSchema>) =>
    (StoryComponent: React.ComponentType) => (
        <StoreProvider initialState={state}>
            <StoryComponent />
        </StoreProvider>
    );
