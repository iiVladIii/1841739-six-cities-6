import { StateSchema } from '@/app/providers/store';
import { useSelector } from 'react-redux';

export const getUserAuthData = (state: StateSchema) => state.user.user;

export function useUserAuthData() {
    return useSelector(getUserAuthData);
}

export const getAuthError = (state: StateSchema) => state.user.authError;

export function useAuthError() {
    return useSelector(getAuthError);
}
