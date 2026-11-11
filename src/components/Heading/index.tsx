import * as Styled from './styles';

export type HeadingProps = {
  children: React.ReactNode;
  colorDark?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'small' | 'medium' | 'big' | 'huge';
};

export const Heading = ({
  children,
  colorDark = true,
  as = 'h1',
  size = 'huge',
}: HeadingProps) => {
  return (
    <Styled.Title colorDark={colorDark} as={as} size={size}>
      {children}
    </Styled.Title>
  );
};
