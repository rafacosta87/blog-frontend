import React from 'react';
import { Footer } from '../../components/Footer';
import { GoTop } from '../../components/GoTop';
import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';
import { ToggleTheme } from '../../components/ToggleTheme';
import { SearchInput } from '../../components/SearchInput';
import { Settings } from '../../shared-types/settings';
import { PostModel } from '../../shared-types/post';
import * as Styled from './styles';

export type BaseTemplateProps = {
  settings: Settings;
  posts?: PostModel[];
  children: React.ReactNode;
};

export const BaseTemplate = ({
  settings,
  posts = [],
  children,
}: BaseTemplateProps) => {
  const logoUrl = settings?.logo?.url || '';

  return (
    <Styled.Wrapper>
      <ToggleTheme />
      <Menu blogName={settings.blogName} logo={logoUrl} posts={posts} />

      <Styled.HeaderContainer>
        <Header
          blogName={settings.blogName}
          blogDescription={settings.blogDescription}
          logo={logoUrl}
        />
      </Styled.HeaderContainer>

      <SearchInput />

      <Styled.ContentContainer>{children}</Styled.ContentContainer>
      <Styled.FooterContainer>
        <Footer footerHtml={settings.text} />
      </Styled.FooterContainer>

      <GoTop />
    </Styled.Wrapper>
  );
};
