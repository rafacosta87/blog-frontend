import styled, { css, DefaultTheme } from 'styled-components';
import { Title as HeadingStyles } from '../Heading/styles';

type MenuBehaviorProps = {
  menuVisible: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;
const wrapperChanger = (
  menuVisible: MenuBehaviorProps['menuVisible'],
  theme: DefaultTheme,
) => css`
  left: ${menuVisible ? '0' : '-30rem'};
  overflow-y: ${menuVisible ? 'auto' : 'hidden'};

  @media ${theme.media.lteMedium} {
    left: ${menuVisible ? '0' : '-32rem'};
  }
`;

export const Wrapper = styled.div<
  MenuBehaviorProps & React.ComponentPropsWithRef<'div'>
>`
  ${({ theme, menuVisible }) => css`
    background: ${theme.colors.primary};
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    position: fixed;
    z-index: 1;
    width: 100%;
    max-width: 32rem;
    height: 100vh;
    top: 0;
    left: 0;
    transition: all 300ms ease-in-out;
    overflow-y: auto;
    ${wrapperChanger(menuVisible, theme)}
  `}
`;

export const Nav = styled.nav`
  margin: 0;
  padding-top: ${({ theme }) => theme.spacings.medium};
  width: 100%;
  /* MÁGICA AQUI: Transforma o menu em uma coluna de altura total */
  display: flex;
  flex-direction: column;
  height: calc(
    100vh - 2rem
  ); /* Altura total descontando os paddings do Wrapper */
`;

export const Logo = styled.div`
  ${({ theme }) => css`
    ${HeadingStyles} {
      display: flex;
      justify-content: center;
      margin: 0;
      margin-bottom: ${theme.spacings.medium};

      img {
        border: 0.5rem solid ${theme.colors.secondary};
      }
    }
  `}
`;

export const OpenClose = styled.a<MenuBehaviorProps>`
  ${({ theme, menuVisible }) => css`
    position: fixed;
    top: 1rem;
    left: 1rem;
    color: ${theme.colors.white};
    background: ${theme.colors.primary};
    z-index: 2;
    width: 3rem;
    height: 3rem;
    transition: all 300ms ease-in-out;
    display: ${menuVisible
      ? 'none'
      : 'flex'}; /* Se o menu abrir, o botão some completamente */
    align-items: center;
    justify-content: center;
    border-radius: 0.4rem;
  `}
`;

export const CloseMenuLink = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  ${({ theme }) => css`
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    width: 100%;

    /* Empurra este botão para a base absoluta do container flex */
    margin-top: auto;

    /* Espaçamento interno para combinar com o MenuLink padrão */
    padding: 1rem;
    font-size: 1.8rem;
    font-weight: 600;

    /* Respeita a cor do texto do tema atual */
    color: ${theme.colors.white};

    border-radius: 0.5rem;
    transition: all 200ms ease-in-out;

    svg {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem; /* Dá um espacinho entre a seta e a palavra "Fechar" */
    }
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
