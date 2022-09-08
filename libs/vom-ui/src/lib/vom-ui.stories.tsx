import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VomUi } from './vom-ui';

export default {
  component: VomUi,
  title: 'VomUi',
} as ComponentMeta<typeof VomUi>;

const Template: ComponentStory<typeof VomUi> = (args) => <VomUi {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
