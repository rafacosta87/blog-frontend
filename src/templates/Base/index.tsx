import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer';
import { GoTop } from '../../components/GoTop';
import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';
import { ToggleTheme } from '../../components/ToggleTheme';
import { SettingsStrapi } from '../../shared-types/settings-strapi';
import { PostStrapi } from '../../shared-types/post-strapi';
import * as Styled from './styles';

import { Search } from '@styled-icons/material-outlined/Search';

export type BaseTemplateProps = {
  settings: SettingsStrapi;
  posts?: PostStrapi[];
  children: React.ReactNode;
};

export const BaseTemplate = ({
  settings,
  posts = [],
  children,
}: BaseTemplateProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(router?.query?.q || '');
  const [searchDisabled, setSearchDisabled] = useState(false);

  useEffect(() => {
    if (router?.query?.q) {
      setSearchValue(router.query.q as string);
    }
  }, [router?.query?.q]);

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
      router.push('/');
    }
  };

  return (
    <Styled.Wrapper>
      <ToggleTheme />
      {settings.logo.map((el) => {
        return (
          <span key={el.id}>
            <Menu blogName={settings.blogName} logo={el.url} posts={posts} />
          </span>
        );
      })}

      <Styled.HeaderContainer>
        {settings.logo.map((el) => {
          return (
            <span key={el.id}>
              <Header
                blogName={settings.blogName}
                blogDescription={settings.blogDescription}
                logo={el.url}
              />
            </span>
          );
        })}
      </Styled.HeaderContainer>

      <Styled.SearchContainer>
        <Styled.SearchInputWrapper>
          <Styled.SearchInput
            type="search"
            placeholder="Encontre posts"
            name="q"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={searchDisabled}
          />
          <Search
            className="search-ok-icon"
            aria-label="Pesquisar"
            onClick={handleSearch}
          />
        </Styled.SearchInputWrapper>
      </Styled.SearchContainer>

      <Styled.ContentContainer>{children}</Styled.ContentContainer>
      <Styled.FooterContainer>
        <Footer footerHtml={settings.text} />
      </Styled.FooterContainer>

      <GoTop />
    </Styled.Wrapper>
  );
};
