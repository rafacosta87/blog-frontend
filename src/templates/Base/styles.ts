//depois perguntar referente a largura de  de SerchContainer 120 e SearchInputContainer 25, perguntar também pq border radius é passado para SeachInput ao invés de SearchContainer
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  svg.search-ok-icon {
    width: 2.4rem;
    height: 2.4rem;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 200ms ease-in-out;
    color: gray;
  }
`;

export const HeaderContainer = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.xhuge};
    padding: 0 ${theme.spacings.large};
  `}
`;

export const SearchContainer = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    margin-bottom: ${theme.spacings.xlarge};
    padding: 0 ${theme.spacings.large};
    max-width: 120rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 25rem;
  width: 100%;
`;

export const SearchInput = styled.input<
  React.InputHTMLAttributes<HTMLInputElement>
>`
  ${({ theme }) => css`
    padding: 0.8rem 4rem 0.8rem ${theme.spacings.small};
    width: 100%;
    border: 0.1rem solid ${theme.colors.mediumGray};
    border-radius: 0.5rem;
    outline: none;
    transition: all 200ms ease-in-out;

    &:focus {
      border-color: ${theme.colors.primary};
    }

    &:disabled {
      outline: 0.1rem solid ${theme.colors.secondary};
    }
  `}
`;

export const ContentContainer = styled.div`
  ${({ theme }) => css`
    max-width: 120rem;
    width: 100%;
    margin: 0 auto;
    margin-bottom: ${theme.spacings.large};
    flex: 1;
  `}
`;

export const FooterContainer = styled.div`
  ${({ theme }) => css`
    max-width: 120rem;
    width: 100%;
    margin: 0 auto;
    padding: ${theme.spacings.large};
  `}
`;
