import styled, { css } from 'styled-components';

export const Container = styled.a<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    color: ${theme.colors.white};
    text-decoration: none;
    padding: 1rem;
    font-size: 1.7rem;
    font-weight: 600;
    border-radius: 0.5rem;
    transition: all 200ms ease-in-out;

    /* EFEITO DE HOVER DA BARRA LATERAL */
    &:hover {
      background: ${
        theme.name !== 'inverted'
          ? 'rgba(255, 255, 255, 0.15)' /* Perfeito para fundo escuro (default) */
          : 'rgba(0, 0, 0, 0.05)' /* Perfeito para fundo claro (inverted) */
      };
    }
  `}
`;
