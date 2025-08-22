import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-a11y'
    // Essentials & Interactions are built into SB9 now
  ],
  docs: { autodocs: 'tag' },
};

export default config;
