import type { Meta, StoryObj } from '@storybook/react-vite';
import { CityPageTabs } from './city-page-tabs';
import { StoreDecorator } from '@/shared/config/storybook/store-decorator';
import { CITY_NAME } from '@/entities/city';

const meta: Meta<typeof CityPageTabs> = {
    title: 'features/CityPageTabs',
    component: CityPageTabs,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof CityPageTabs>;

export const Paris: Story = {
    decorators: [
        StoreDecorator({
            city: {
                name: CITY_NAME.Paris,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: ['/?city=Paris&sort-by=popular-desc'],
        },
    },
};

export const Amsterdam: Story = {
    decorators: [
        StoreDecorator({
            city: {
                name: CITY_NAME.Amsterdam,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: ['/?city=Amsterdam&sort-by=popular-desc'],
        },
    },
};

export const Cologne: Story = {
    decorators: [
        StoreDecorator({
            city: {
                name: CITY_NAME.Cologne,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: ['/?city=Cologne&sort-by=popular-desc'],
        },
    },
};

export const Brussels: Story = {
    decorators: [
        StoreDecorator({
            city: {
                name: CITY_NAME.Brussels,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: ['/?city=Brussels&sort-by=popular-desc'],
        },
    },
};

export const Hamburg: Story = {
    decorators: [
        StoreDecorator({
            city: {
                name: CITY_NAME.Hamburg,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: ['/?city=Hamburg&sort-by=popular-desc'],
        },
    },
};

export const Dusseldorf: Story = {
    decorators: [
        StoreDecorator({
            city: {
                name: CITY_NAME.Dusseldorf,
            },
        }),
    ],
    parameters: {
        router: {
            initialEntries: ['/?city=Dusseldorf&sort-by=popular-desc'],
        },
    },
};

export const NoCity: Story = {
    decorators: [
        StoreDecorator({
            city: {
                name: undefined,
            },
        }),
    ],
};
