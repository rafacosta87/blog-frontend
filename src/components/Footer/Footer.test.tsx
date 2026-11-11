import { screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { Footer } from '.';

describe('<Footer />', () => {
  it('should render', () => {
    const { container } = renderTheme(<Footer footerHtml={'<h1>Olá</h1>'} />);
    expect(screen.getByRole('heading', { name: 'Olá' })).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(`
      .c1 {
        font-size: calc(1.6rem + 0.2rem);
        line-height: 1.5;
      }

      .c1 p {
        margin: 2.4rem 0;
      }

      .c1 a,
      .c1 a:visited,
      .c1 a:link {
        color: #dc143c;
        -webkit-text-decoration: none;
        text-decoration: none;
        -webkit-transition: all 300ms ease-in-out;
        transition: all 300ms ease-in-out;
      }

      .c1 a:hover,
      .c1 a:visited:hover,
      .c1 a:link:hover {
        -webkit-filter: brightness(50%);
        filter: brightness(50%);
      }

      .c0 {
        text-align: center;
        border-top: 0.1rem solid #DDDDDD;
      }

      .c0 a {
        color: inherit;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      @media (max-width:768px) {
        .c1 {
          font-size: 2rem;
        }
      }

      <div>
        <footer
          class="c0"
        >
          <div
            class="c1"
          >
            <h1>
              Olá
            </h1>
          </div>
        </footer>
      </div>
    `);
  });
});
