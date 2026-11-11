import { fireEvent, screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { Menu, MenuProps } from '.';

import mock from './mock';

const props: MenuProps = mock;

describe('<Menu />', () => {
  it('should render button link', () => {
    renderTheme(<Menu {...props} />);

    const buttonLink = screen.getByRole('link', { name: 'Open or close menu' });
    const openMenuIcon = screen.getByLabelText('Open menu');

    expect(buttonLink).toBeInTheDocument();
    expect(openMenuIcon).toBeInTheDocument();
  });

  it('should open/close menu on button click', () => {
    const mockPosts = [
      {
        id: '1',
        title: 'Post 1',
        slug: 'post-1',
        excerpt: '',
        content: '',
        createdAt: '',
        cover: { id: '1', alternativeText: '', url: '' },
        categories: [],
        tags: [],
        author: { id: '1', displayName: '', slug: '' },
      },
    ];
    renderTheme(<Menu {...props} posts={mockPosts} />);

    const buttonLink = screen.getByRole('link', { name: 'Open or close menu' });
    fireEvent.click(buttonLink);

    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    expect(screen.queryByLabelText('Open menu')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Otávio Miranda' }));
    expect(screen.getByRole('img', { name: 'Otávio Miranda' }));
    expect(
      screen.getByRole('navigation').querySelectorAll('a:not([href="/"])'),
    ).toHaveLength(mockPosts.length);

    fireEvent.click(buttonLink);

    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = renderTheme(<Menu {...props} />);
    expect(container).toMatchSnapshot();
  });
});
