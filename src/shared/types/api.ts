import { AxiosError } from 'axios';

interface ServerErrorDetail {
    property: string;
    value: string;
    messages: string[];
}
export type ERROR_TYPE = 'UNEXPECTED_ERROR' | 'VALIDATION_ERROR';

export interface ServerError {
    errorType: ERROR_TYPE;
    message: string;
    details: ServerErrorDetail[];
}

export const UNEXPECTED_ERROR_MESSAGE = 'Произошла непредвиденная ошибка';

export function apiErrorHandler(e: unknown) {
    if (e instanceof AxiosError && e.response?.data) {
        const serverError = e.response.data as ServerError;
        return serverError;
    }
    return {
        errorType: 'UNEXPECTED_ERROR',
        message: UNEXPECTED_ERROR_MESSAGE,
        details: [],
    };
}
