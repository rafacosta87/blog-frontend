import Link from 'next/link';
import * as Styled from './styles';

export type MenuLinkProps = {
  children: React.ReactNode;
  link: string;
};

export const MenuLink = ({ children, link }: MenuLinkProps) => {
  return (
    <Link href={link} passHref>
      <Styled.Container>{children}</Styled.Container>
    </Link>
  );
};
