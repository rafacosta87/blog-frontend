import { Meta, Story } from '@storybook/react/types-6-0';
import { SearchInput } from '.';

export default {
  title: 'SearchInput',
  component: SearchInput,
} as Meta;

export const Template: Story = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <SearchInput />
    </div>
  );
};
