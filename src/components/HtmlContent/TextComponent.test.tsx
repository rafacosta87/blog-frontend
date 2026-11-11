import { screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { HtmlContent } from '.';

describe('<HtmlContent />', () => {
  it('should render a text', () => {
    renderTheme(<HtmlContent html={'<b>Children</b>'} />);
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = renderTheme(<HtmlContent html={'<b>Children</b>'} />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        font-size: calc(1.6rem + 0.2rem);
        line-height: 1.5;
      }

      .c0 p {
        margin: 2.4rem 0;
      }

      .c0 a,
      .c0 a:visited,
      .c0 a:link {
        color: #dc143c;
        -webkit-text-decoration: none;
        text-decoration: none;
        -webkit-transition: all 300ms ease-in-out;
        transition: all 300ms ease-in-out;
      }

      .c0 a:hover,
      .c0 a:visited:hover,
      .c0 a:link:hover {
        -webkit-filter: brightness(50%);
        filter: brightness(50%);
      }

      @media (max-width:768px) {
        .c0 {
          font-size: 2rem;
        }
      }

      <div
        class="c0"
      >
        <b>
          Children
        </b>
      </div>
    `);
  });
});
