import { renderTheme } from '../../styles/render-theme';
import { Loading } from '.';

describe('<Loading />', () => {
  it('should render loading spinner', () => {
    const { container } = renderTheme(<Loading />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({
      position: 'fixed',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  });

  it('should match snapshot', () => {
    const { container } = renderTheme(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
