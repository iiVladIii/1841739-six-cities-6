import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLinkWithParams } from './use-navigate-with-params';

vi.mock('react-router-dom', () => ({
    useSearchParams: vi.fn(),
}));

import { useSearchParams } from 'react-router-dom';

describe('useLinkWithParams', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return route with existing search params', () => {
        const mockSearchParams = new URLSearchParams('foo=bar&baz=qux');
        vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);

        const { result } = renderHook(() => useLinkWithParams());
        const link = result.current('/test');

        expect(link).toBe('/test?foo=bar&baz=qux');
    });

    it('should add new params to existing search params', () => {
        const mockSearchParams = new URLSearchParams('existing=value');
        vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);

        const { result } = renderHook(() => useLinkWithParams());
        const link = result.current('/test', { newParam: 'newValue' });

        expect(link).toBe('/test?existing=value&newParam=newValue');
    });

    it('should override existing params with new ones', () => {
        const mockSearchParams = new URLSearchParams('param=old');
        vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);

        const { result } = renderHook(() => useLinkWithParams());
        const link = result.current('/route', { param: 'new' });

        expect(link).toBe('/route?param=new');
    });

    it('should work with empty search params', () => {
        const mockSearchParams = new URLSearchParams();
        vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);

        const { result } = renderHook(() => useLinkWithParams());
        const link = result.current('/path');

        expect(link).toBe('/path?');
    });

    it('should handle multiple new params', () => {
        const mockSearchParams = new URLSearchParams();
        vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);

        const { result } = renderHook(() => useLinkWithParams());
        const link = result.current('/page', { a: '1', b: '2', c: '3' });

        expect(link).toBe('/page?a=1&b=2&c=3');
    });

    it('should return same function reference when searchParams unchanged', () => {
        const mockSearchParams = new URLSearchParams('test=value');
        vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);

        const { result, rerender } = renderHook(() => useLinkWithParams());
        const firstRender = result.current;

        rerender();
        const secondRender = result.current;

        expect(firstRender).toBe(secondRender);
    });
});
