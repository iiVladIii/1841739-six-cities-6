import { UserAuthData } from './user';
import { ServerError } from '@/shared/types/api';

export interface UserSchema {
    user?: UserAuthData;
    authError?: ServerError;
}
