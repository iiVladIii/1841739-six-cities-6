import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CityPageTabs } from './city-page-tabs';

vi.mock('@/entities/city', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/entities/city')>();
    return {
        ...actual,
        cityActions: {
            setCity: vi.fn(),
            resetCity: vi.fn(),
        },
        useCityName: vi.fn(),
    };
});

vi.mock('@/shared/hooks/use-app-dispatch', () => ({
    useAppDispatch: vi.fn(),
}));

vi.mock('@/shared/hooks/use-navigate-with-params', () => ({
    useLinkWithParams: vi.fn(),
}));

const { CITY_NAME, useCityName } = await import('@/entities/city');
const { useAppDispatch } = await import('@/shared/hooks/use-app-dispatch');
const { useLinkWithParams } = await import(
    '@/shared/hooks/use-navigate-with-params'
);

describe('CityPageTabs', () => {
    const mockDispatch = vi.fn();
    const mockGetRouteLink = vi.fn(
        (route: string, params?: Record<string, string>) => {
            const searchParams = new URLSearchParams(params).toString();
            return `${route}?${searchParams}`;
        },
    );

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useCityName).mockReturnValue(CITY_NAME.Paris);
        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
        vi.mocked(useLinkWithParams).mockReturnValue(mockGetRouteLink);
    });

    it('should render all cities', () => {
        render(
            <MemoryRouter initialEntries={['/?city=Paris']}>
                <CityPageTabs />
            </MemoryRouter>,
        );

        Object.values(CITY_NAME).forEach((city) => {
            expect(screen.getByText(city)).toBeInTheDocument();
        });
    });

    it('should highlight active city', () => {
        render(
            <MemoryRouter initialEntries={['/?city=Paris']}>
                <CityPageTabs />
            </MemoryRouter>,
        );

        const parisLink = screen.getByText(CITY_NAME.Paris).closest('a');
        expect(parisLink).toHaveClass('tabs__item--active');
    });
});
