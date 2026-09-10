import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.a`
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
`;
