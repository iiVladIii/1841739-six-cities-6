import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { reduxStore } from '../model/config';

interface Props {
    children: ReactNode;
}

export const StoreProvider = (props: Props) => {
    const { children } = props;

    return <Provider store={reduxStore}>{children}</Provider>;
};
