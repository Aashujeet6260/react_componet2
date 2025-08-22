
import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
    a11y: { element: '#root' },
  },
};
export default preview;
