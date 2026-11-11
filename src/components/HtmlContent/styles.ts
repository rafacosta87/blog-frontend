import styled, { css } from 'styled-components';

export const Container = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  ${({ theme }) => css`
    font-size: calc(${theme.font.sizes.small} + 0.2rem);
    line-height: 1.5;

    p {
      margin: ${theme.spacings.medium} 0;
    }

    a,
    a:visited,
    a:link {
      color: ${theme.colors.secondary};
      text-decoration: none;
      transition: all 300ms ease-in-out;

      &:hover {
        filter: brightness(50%);
      }
    }

    @media ${theme.media.lteMedium} {
      font-size: 2rem;
    }
  `}
`;
