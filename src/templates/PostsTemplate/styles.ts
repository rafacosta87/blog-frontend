import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ButtonContainer = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.spacings.large};
    margin: ${theme.spacings.large} 0;
    display: flex;
    justify-content: center;
  `}
`;

export const Button = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;
    padding: ${theme.spacings.small} ${theme.spacings.large};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    font-size: 1.6rem;
    font-weight: 700;
    border-radius: 0.5rem;
    transition: all 200ms ease-in-out;

    svg.loading-icon {
      width: 2rem;
      height: 2rem;
      animation: ${rotate} 0.8s linear infinite;
    }

    &:hover:not(:disabled) {
      opacity: 0.8;
    }

    &:disabled {
      background: ${theme.colors.darkerGray};
      cursor: not-allowed;
    }
  `}
`;
