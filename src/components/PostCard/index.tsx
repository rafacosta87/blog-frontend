/* eslint-disable prettier/prettier */
import Link from 'next/link';
import { StrapiImage } from '../../shared-types/strapi-image';
import { Heading } from '../Heading';
import * as Styled from './styles';

export type PostCardProps = {
  id: string;
  title: string;
  cover: StrapiImage[];
  excerpt: string;
  slug: string;
};

export const PostCard = ({ title, cover = [], excerpt, slug }: PostCardProps) => {
  return (
    <Styled.Wrapper>
      {cover.map((el) => {
        return (
          <span key={el.id}>
            <Link href={`/post/${slug}`}>
              <a>
                <Styled.Cover src={el.url} alt={title} />
              </a>
            </Link>
          </span>
        );
      })}

      <Heading as="h2" size="small">
        <Link href={`/post/${slug}`}>
          <a>{title}</a>
        </Link>
      </Heading>

      <Styled.Excerpt>{excerpt}</Styled.Excerpt>
    </Styled.Wrapper>
  );
};
