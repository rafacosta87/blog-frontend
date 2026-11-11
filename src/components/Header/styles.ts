import styled, { css } from 'styled-components';
import { Title as HeadingStyles } from '../Heading/styles';

export const Wrapper = styled.header`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: ${theme.spacings.xlarge};
    width: 100%;
    max-width: ${theme.sizes.max};
    color: ${theme.colors.darkText};
    font-size: ${theme.font.sizes.small};
    margin: 0 auto;

    ${HeadingStyles} {
      margin: 0 0 calc(${theme.spacings.small} - 1rem) 0;
    }

    @media ${theme.media.lteSmall} {
      ${HeadingStyles} {
        margin: 0 0 ${theme.spacings.medium} 0;
      }
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    text-align: center;
    max-width: 48rem;

    @media ${theme.media.lteSmall} {
      margin-top: ${theme.spacings.small};
    }
  `}
`;
