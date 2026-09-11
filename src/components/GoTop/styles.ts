import styled, { css } from 'styled-components';

export const Container = styled.a<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>`
  ${({ theme }) => css`
    position: fixed;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    bottom: 2rem;
    right: 2rem;
    z-index: 6;
    border-radius: 0.5rem;
  `}
`;
