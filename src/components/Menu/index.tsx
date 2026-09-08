import { Menu as MenuIcon } from '@styled-icons/material-outlined/Menu';
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close';
import React, { useState } from 'react';
import { LogoLink } from '../LogoLink';
import { MenuLink } from '../MenuLink';
import * as Styled from './styles';
import { PostStrapi } from '../../shared-types/post-strapi';

export type MenuProps = {
  blogName: string;
  logo: string;
  posts?: PostStrapi[];
};

export const Menu = ({ blogName, logo, posts = [] }: MenuProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleOpenCloseMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuVisible((v) => !v);
  };

  return (
    <>
      <Styled.OpenClose
        menuVisible={menuVisible}
        href="#"
        aria-label="Open or close menu"
        title="Open or close menu"
        onClick={handleOpenCloseMenu}
      >
        {menuVisible && <CloseIcon aria-label="Close menu" />}
        {!menuVisible && <MenuIcon aria-label="Open menu" />}
      </Styled.OpenClose>

      <Styled.Wrapper menuVisible={menuVisible} aria-hidden={!menuVisible}>
        <Styled.Nav>
          <Styled.Logo>
            <LogoLink link="/" text={blogName} srcImg={logo} />
          </Styled.Logo>

          {posts.map((post) => (
            <MenuLink key={post.id} link={`/post/${post.slug}`}>
              {post.title}
            </MenuLink>
          ))}
        </Styled.Nav>
      </Styled.Wrapper>
    </>
  );
};
