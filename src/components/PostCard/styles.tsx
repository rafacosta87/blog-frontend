import styled, { css } from 'styled-components';
import { Title as HeadingStyles } from '../Heading/styles';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    height: 100%; /* Força todos os cards a esticarem até a mesma altura da linha */

    ${HeadingStyles} {
      margin: 0;
      margin-top: calc(${theme.spacings.small} - 0.6rem);
      margin-bottom: ${theme.spacings.small};
    }

    a {
      text-decoration: none;
      color: inherit;
      transition: all 300ms ease-in-out;
    }

    &:hover a {
      color: ${theme.colors.secondary};
    }

    &:hover img {
      opacity: 0.8;
    }
  `}
`;

export const Cover = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  transition: opacity 300ms ease-in-out;
  border-radius: 0.8rem;
`;

export const Excerpt = styled.p`
  margin: 0; /* MÁGICA AQUI: Empurra o texto para a base do card, alinhando tudo por baixo! */
`;
