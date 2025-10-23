import { UserAuthData } from './User';
import { ServerError } from '@/shared/types/api';

export interface UserSchema {
    user?: UserAuthData;
    authError?: ServerError;
}
