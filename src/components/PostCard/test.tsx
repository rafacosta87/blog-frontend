/* eslint-disable prettier/prettier */
import { screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { PostCard, PostCardProps } from '.';

import mock from './mock';

const props: PostCardProps = mock;

describe('<PostCard />', () => {
  it('should render a heading, cover and excerpt', () => {
    renderTheme(<PostCard {...props} />);

    expect(
      screen.getByRole('heading', { name: mock.title }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: mock.title })).toBeInTheDocument();
    expect(screen.getByText(mock.excerpt)).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: mock.title })[0],
    ).toHaveAttribute('href', `/post/${mock.slug}`);
  });

  it('should render a post', () => {
    renderTheme(<PostCard {...props} />);

    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('img')).toHaveAttribute('src', `https://res.cloudinary.com/dlizakp2a/image/upload/v1614698965/Ubuntu_gel_by_Midge_Mantissa_Sinnaeve_7caea7ddb4.jpg`);
  });

  it('should match snapshot', () => {
    const { container } = renderTheme(<PostCard {...props} />);
    expect(container).toMatchSnapshot();
  });
});
