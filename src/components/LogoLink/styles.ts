import styled, { css } from 'styled-components';

export const Container = styled.a<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    margin-bottom: ${theme.spacings.medium};

    > img {
      width: 15rem;
      height: 15rem;
      border-radius: 50%;
      background: white;
    }
  `}
`;
