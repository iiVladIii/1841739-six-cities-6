import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useLinkWithParams() {
    const [searchParams] = useSearchParams();
    return useCallback(
        (route: string, params?: Record<string, string>) => {
            const urlParams = new URLSearchParams(searchParams);
            Object.entries(params ?? {}).forEach(([key, value]) => {
                urlParams.set(key, value);
            });
            return `${route}?${urlParams.toString()}`;
        },
        [searchParams],
    );
}
