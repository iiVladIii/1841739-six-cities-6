import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SortSelector } from './sort-selector';

vi.mock('@/entities/offer', () => ({
    OFFER_SORT_OPTIONS: [
        { value: 'popular-desc', label: 'Popular' },
        { value: 'price-asc', label: 'Price: low to high' },
        { value: 'price-desc', label: 'Price: high to low' },
    ],
}));

vi.mock('@/shared/hooks/use-outside-click', () => ({
    useOutsideClick: vi.fn(),
}));

describe('SortSelector', () => {
    it('should render with selected option', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/?sort-by=popular-desc']}>
                <SortSelector />
            </MemoryRouter>,
        );

        const sortingType = container.querySelector('.places__sorting-type');
        expect(sortingType).toHaveTextContent('Popular');
    });

    it('should open options list on click', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/?sort-by=popular-desc']}>
                <SortSelector />
            </MemoryRouter>,
        );

        const sortingType = container.querySelector('.places__sorting-type');
        fireEvent.click(sortingType!);

        const list = container.querySelector('.places__options--opened');
        expect(list).toBeInTheDocument();
    });

    it('should render all sort options when opened', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/?sort-by=popular-desc']}>
                <SortSelector />
            </MemoryRouter>,
        );
        const sortingType = container.querySelector('.places__sorting-type');
        fireEvent.click(sortingType!);
        const optionsList = container.querySelector('.places__options');
        expect(optionsList).toHaveTextContent('Popular');
        expect(optionsList).toHaveTextContent('Price: low to high');
        expect(optionsList).toHaveTextContent('Price: high to low');
    });

    it('should highlight active option', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/?sort-by=popular-desc']}>
                <SortSelector />
            </MemoryRouter>,
        );
        const sortingType = container.querySelector('.places__sorting-type');
        fireEvent.click(sortingType!);
        const activeOption = container.querySelector('.places__option--active');
        expect(activeOption).toBeInTheDocument();
        expect(activeOption).toHaveTextContent('Popular');
    });

    it('should change sort option on click', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/?sort-by=popular-desc']}>
                <SortSelector />
            </MemoryRouter>,
        );
        const sortingType = container.querySelector('.places__sorting-type');
        fireEvent.click(sortingType!);
        const options = container.querySelectorAll('.places__option');
        const priceAscOption = Array.from(options).find(
            (opt) => opt.textContent === 'Price: low to high',
        );
        fireEvent.click(priceAscOption!);

        const list = container.querySelector('.places__options--opened');
        expect(list).not.toBeInTheDocument();
    });
});
