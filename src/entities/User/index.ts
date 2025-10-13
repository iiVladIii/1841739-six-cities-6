import { UserAuthData } from './model/types/User';

/**
 * Хук-заглушка для получения данных аутентифицированного пользователя
 * TODO: Заменить на реальную реализацию
 * @param isAuth - флаг аутентификации пользователя
 * @returns данные пользователя или undefined
 */
export const useUserAuthData = (isAuth?: boolean) => {
    const user: UserAuthData = {
        avatarUrl: '',
        email: '',
        isPro: false,
        name: '',
        token: '',
    };
    return isAuth ? user : undefined;
};

export type { UserAuthData, User } from './model/types/User';
