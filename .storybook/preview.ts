import type { Preview } from '@storybook/react-vite';
import { RouterDecorator } from '../src/shared/config/storybook/router-decorator';
import { SvgSpriteDecorator } from '../src/shared/config/storybook/svg-sprite-decorator';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [RouterDecorator(), SvgSpriteDecorator],
};

export default preview;
