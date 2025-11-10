import type { Meta, StoryObj } from '@storybook/react-vite';
import { SortSelector } from './sort-selector';

const meta: Meta<typeof SortSelector> = {
    title: 'features/SortSelector',
    component: SortSelector,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof SortSelector>;

export const Default: Story = {
    parameters: {
        router: {
            initialEntries: ['/'],
        },
    },
};

export const PopularDesc: Story = {
    parameters: {
        router: {
            initialEntries: ['/?sort-by=popular-desc'],
        },
    },
};

export const PriceAsc: Story = {
    parameters: {
        router: {
            initialEntries: ['/?sort-by=price-asc'],
        },
    },
};

export const PriceDesc: Story = {
    parameters: {
        router: {
            initialEntries: ['/?sort-by=price-desc'],
        },
    },
};

export const RatingDesc: Story = {
    parameters: {
        router: {
            initialEntries: ['/?sort-by=rating-desc'],
        },
    },
};
