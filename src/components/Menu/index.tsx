import { Menu as MenuIcon } from '@styled-icons/material-outlined/Menu';
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close';
import { ArrowBack as ArrowBackIcon } from '@styled-icons/material-outlined/ArrowBack';
import React, { useEffect, useRef, useState } from 'react';
import { LogoLink } from '../LogoLink';
import { MenuLink } from '../MenuLink';
import * as Styled from './styles';
import { PostModel } from '../../shared-types/post';

export type MenuProps = {
  blogName: string;
  logo: string;
  posts?: PostModel[];
};

export const Menu = ({ blogName, logo, posts = [] }: MenuProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpenCloseMenu = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    setMenuVisible((v) => !v);
  };

  useEffect(() => {
    const handleOutsideClickAndEsc = (event: MouseEvent | KeyboardEvent) => {
      // 1. Lógica do ESC
      if (event instanceof KeyboardEvent && event.key === 'Escape') {
        setMenuVisible(false);
      }

      // 2. Lógica do Clique Fora
      if (
        event instanceof MouseEvent &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        const isClickOnOpenButton = (event.target as HTMLElement).closest(
          '[aria-label="Open or close menu"]',
        );
        if (!isClickOnOpenButton) {
          setMenuVisible(false);
        }
      }
    };

    if (menuVisible) {
      document.addEventListener('mousedown', handleOutsideClickAndEsc);
      document.addEventListener('keydown', handleOutsideClickAndEsc);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClickAndEsc);
      document.removeEventListener('keydown', handleOutsideClickAndEsc);
    };
  }, [menuVisible]);

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

      <Styled.Wrapper
        ref={menuRef}
        menuVisible={menuVisible}
        aria-hidden={!menuVisible}
      >
        <Styled.Nav>
          <Styled.Logo>
            <LogoLink link="/" text={blogName} srcImg={logo} />
          </Styled.Logo>

          {posts.map((post) => (
            <MenuLink key={post.id} link={`/post/${post.slug}`}>
              {post.title}
            </MenuLink>
          ))}

          <Styled.CloseMenuLink onClick={handleOpenCloseMenu}>
            <ArrowBackIcon aria-hidden="true" />
            Fechar Menu
          </Styled.CloseMenuLink>
        </Styled.Nav>
      </Styled.Wrapper>
    </>
  );
};
