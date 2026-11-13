import { Autorenew } from '@styled-icons/material-outlined/Autorenew';
import * as Styled from './styles';

export type LoadMoreButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  noMorePosts?: boolean;
};

export const LoadMoreButton = ({
  onClick,
  disabled = false,
  noMorePosts = false,
}: LoadMoreButtonProps) => {
  return (
    <Styled.Container>
      <Styled.Button onClick={onClick} disabled={disabled || noMorePosts}>
        {disabled && !noMorePosts ? (
          <>
            <Autorenew className="loading-icon" aria-label="Carregando" />
            Carregando posts...
          </>
        ) : noMorePosts ? (
          'Sem mais posts'
        ) : (
          'Carregar mais'
        )}
      </Styled.Button>
    </Styled.Container>
  );
};
