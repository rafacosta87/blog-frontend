import { Meta, Story } from '@storybook/react/types-6-0';
import { LoadMoreButton, LoadMoreButtonProps } from '.';

export default {
  title: 'LoadMoreButton',
  component: LoadMoreButton,
  args: {
    disabled: false,
    noMorePosts: false,
  },
} as Meta<LoadMoreButtonProps>;

export const Template: Story<LoadMoreButtonProps> = (args) => (
  <LoadMoreButton {...args} />
);

export const Loading: Story<LoadMoreButtonProps> = (args) => (
  <LoadMoreButton {...args} disabled={true} />
);

export const NoMorePosts: Story<LoadMoreButtonProps> = (args) => (
  <LoadMoreButton {...args} noMorePosts={true} />
);
