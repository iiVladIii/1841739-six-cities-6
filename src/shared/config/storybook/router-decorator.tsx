import { StoryContext, StoryFn } from '@storybook/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

interface ReactRouterDecoratorProps extends MemoryRouterProps {
    initialEntries?: string[];
}

export const RouterDecorator =
    (defaultProps: ReactRouterDecoratorProps = {}) =>
    (Story: StoryFn, context: StoryContext) => {
        const storyParams: ReactRouterDecoratorProps =
            (context.parameters?.router as
                | ReactRouterDecoratorProps
                | undefined) ?? {};

        const mergedProps: ReactRouterDecoratorProps = {
            ...defaultProps,
            ...storyParams,
        };

        const { initialEntries = ['/'], ...rest } = mergedProps;

        return (
            <MemoryRouter
                initialEntries={initialEntries}
                {...(rest as Omit<MemoryRouterProps, 'initialEntries'>)}
            >
                <Story />
            </MemoryRouter>
        );
    };
