import { screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { MenuLink } from '.';

describe('<MenuLink />', () => {
  it('should render a link', () => {
    renderTheme(<MenuLink link="http://localhost">Children</MenuLink>);
    expect(screen.getByRole('link', { name: 'Children' })).toBeInTheDocument();
  });

  it('should render a internal link', () => {
    renderTheme(<MenuLink link="/localhost">Children</MenuLink>);
    expect(screen.getByRole('link', { name: 'Children' })).toBeInTheDocument();
  });

  it('should render open in a new tab', () => {
    const { container } = renderTheme(
      <MenuLink link="http://localhost" newTab={false}>
        Children
      </MenuLink>,
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        color: #FFFFFF;
        -webkit-text-decoration: none;
        text-decoration: none;
        padding: 1rem;
        font-size: 1.7rem;
        font-weight: 600;
        border-radius: 0.5rem;
        -webkit-transition: all 200ms ease-in-out;
        transition: all 200ms ease-in-out;
      }

      .c0:hover {
        background: rgba(255,255,255,0.15);
      }

      <a
        class="c0"
        href="http://localhost/"
      >
        Children
      </a>
    `);
  });
});
