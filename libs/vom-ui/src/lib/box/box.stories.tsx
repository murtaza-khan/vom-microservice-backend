import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from './box';

export default {
  component: Box,
  title: 'Box',
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
