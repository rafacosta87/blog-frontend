/* eslint-disable prettier/prettier */
import { screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { ArticleHeader, ArticleHeaderProps } from '.';

import mock from './mock';
import { formatDate } from '../../utils/format-date';

const props: ArticleHeaderProps = mock;

describe('<ArticleHeader />', () => {
  it('should render heading, excerpt, cover img and meta', () => {
    const { container } = renderTheme(<ArticleHeader {...props} />);

    expect(
      screen.getByRole('heading', { name: props.title }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: props.title })).toBeInTheDocument();
    expect(screen.getByText(props.excerpt)).toBeInTheDocument();
    expect(screen.getByText(formatDate(props.createdAt))).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(screen.getByRole('img')).toHaveAttribute('src', `https://res.cloudinary.com/dlizakp2a/image/upload/v1614698965/Ubuntu_gel_by_Midge_Mantissa_Sinnaeve_7caea7ddb4.jpg` );
    expect(screen.getByRole('img')).toHaveAttribute('alt', `Vis nobis veritus maluisset id, nonumy adversarium`);
  });
});
