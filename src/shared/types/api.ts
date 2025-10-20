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
