import styled, { css } from 'styled-components';

export const Container = styled.a<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>`
  ${({ theme }) => css`
    display: flex; /* Mudado para flex para alinhar o conteúdo internamente */
    align-items: center;
    width: 100%;
    color: ${theme.colors.white};
    text-decoration: none;

    /* Adicionado padding para criar a área de clique e fundo igual à imagem */
    padding: 1rem;
    font-size: 1.7rem;
    font-weight: 600;

    /* Arredonda levemente os cantos do fundo cinza no hover */
    border-radius: 0.6rem;

    transition: all 200ms ease-in-out;

    /* EFEITO DE HOVER DA BARRA LATERAL */
    &:hover {
      color: ${theme.colors.white}; /* Mantém o texto claro */

      /* AJUSTADO AQUI: Agora testamos se o nome do tema NÃO é o invertido (modo claro) */
      background: ${
        theme.name !== 'inverted'
          ? 'rgba(255, 255, 255, 0.15)' /* Perfeito para fundo escuro (default) */
          : 'rgba(0, 0, 0, 0.05)' /* Perfeito para fundo claro (inverted) */
      };
    }
  `}
`;
