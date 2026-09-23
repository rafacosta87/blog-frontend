/* eslint-disable prettier/prettier */
import Link from 'next/link';
import { BlogImage } from '../../shared-types/blog-image';
import { Heading } from '../Heading';
import * as Styled from './styles';

export type PostCardProps = {
  id: string;
  title: string;
  cover: BlogImage[];
  excerpt: string;
  slug: string;
};

export const PostCard = ({ id, title, cover, excerpt, slug }: PostCardProps) => {
  return (
    <Styled.Wrapper>
            <Link href={`/post/${slug}`}>
              <a>
          <Styled.Cover src={cover[0]?.url || ''} alt={title} />
              </a>
            </Link>
      <Heading as="h2" size="small">
        <Link href={`/post/${slug}`}>
          <a>{title}</a>
        </Link>
      </Heading>

      <Styled.Excerpt>{excerpt}</Styled.Excerpt>
    </Styled.Wrapper>
  );
};

