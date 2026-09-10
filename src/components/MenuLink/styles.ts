import styled, { css } from 'styled-components';

export const Container = styled.a`
  ${({ theme }) => css`
    display: block;
    color: ${theme.colors.white};
    text-decoration: none;
    margin-bottom: ${theme.spacings.small};
    font-size: 1.8rem;
    font-weight: 600;
    transition: all 300ms ease-in-out;

    &:hover {
      color: ${theme.colors.secondary};
    }
  `}
`;
