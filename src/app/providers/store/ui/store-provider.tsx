import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { reduxStore } from '../model/config';
import { StateSchema } from '@/app/providers/store';
import { DeepPartial } from '@reduxjs/toolkit';

interface Props {
    children: ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = (props: Props) => {
    const { children, initialState } = props;

    return (
        <Provider store={reduxStore(initialState as StateSchema)}>
            {children}
        </Provider>
    );
};
