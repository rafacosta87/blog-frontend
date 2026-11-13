import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Search } from '@styled-icons/material-outlined/Search';
import { Autorenew } from '@styled-icons/material-outlined/Autorenew';
import * as Styled from './styles';

export const SearchInput = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(
    (router?.query?.q as string) || '',
  );
  const [searchDisabled, setSearchDisabled] = useState(false);

  const handleSearch = () => {
    const q = (searchValue as string).trim();
    if (!q) return;

    setSearchDisabled(true);
    router
      .push({
        pathname: '/search/',
        query: { q },
      })
      .then(() => setSearchDisabled(false));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      setSearchValue('');
    }
  };

  return (
    <Styled.Container>
      <Styled.InputWrapper>
        <Styled.Input
          type="search"
          placeholder="Encontre posts"
          name="q"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={searchDisabled}
        />
        {searchDisabled ? (
          <Autorenew
            className="search-loading-icon"
            aria-label="Carregando busca"
          />
        ) : (
          <Search
            className="search-ok-icon"
            aria-label="Pesquisar"
            onClick={handleSearch}
          />
        )}
      </Styled.InputWrapper>
    </Styled.Container>
  );
};
