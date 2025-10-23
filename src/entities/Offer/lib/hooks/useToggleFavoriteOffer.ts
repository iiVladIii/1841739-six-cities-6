import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useUserAuthData } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { toggleFavoriteOffer } from '@/entities/Offer';
import { getRouteLoginPage } from '@/shared/consts/router';

export function useToggleFavoriteOffer(id: string, isFavorite: boolean) {
    const dispatch = useAppDispatch();
    const authData = useUserAuthData();
    const navigate = useNavigate();
    return useCallback(() => {
        if (authData) {
            dispatch(
                toggleFavoriteOffer({
                    id: id,
                    status: isFavorite ? 0 : 1,
                }),
            );
        } else {
            navigate(getRouteLoginPage());
        }
    }, [authData, dispatch, navigate, id, isFavorite]);
}
