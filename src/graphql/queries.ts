/* eslint-disable prettier/prettier */
import { gql } from 'graphql-request';
import { GRAPHQL_FRAGMENTS } from './fragments';

export const GRAPHQL_QUERY = gql`
  ${GRAPHQL_FRAGMENTS}
  query GET_POSTS(
    $categorySlug: String
    $postSlug: String
    $postSearch: String
    $authorSlug: String
    $tagSlug: String
    $sort: [String] = "createdAt:desc"
    $start: Int = 0
    $limit: Int = 10
  ) {
    setting {
      ...settings
    }

    posts(
      sort: $sort
      pagination: {
      start: $start
      limit: $limit
      }
      filters: {
         slug:{ eq: $postSlug }
         or: [
          { title: { contains: $postSearch } }
          { content: { contains: $postSearch } }
          { excerpt: { contains: $postSearch } }
        ]
        categories: { slug: { eq: $categorySlug } }
        author: { slug: { eq: $authorSlug } }
        tags: { slug: { eq: $tagSlug } }
      }
    ) {
      ...post
    }
  }
`;

/* query GET_POSTS(
  #  $categorySlug: String
  #  $postSlug: String
  #  $postSearch: String
  #  $authorSlug: String
  #  $tagSlug: String
    $sort: [String] = "createdAt:desc"
    $start: Int = 0
    $limit: Int = 10
  ) {
    setting {
      ...settings
    }

    posts(
      sort: $sort
      pagination: {
      start: $start
      limit: $limit
      }
      # filters: {
      #  slug: $postSlug
      #  title_contains: $postSearch
      #  content_contains: $postSearch
      #  excerpt_contains: $postSearch
      #  categories: { slug: $categorySlug }
      #  author: { slug: $authorSlug }
      #  tags: { slug: $tagSlug }
      #}
    ) {
      ...post
    }
  }

  query GET_POSTS(
    $categorySlug: StringFilterInput
    $postSlug: StringFilterInput
    $postSearch: JSONFilterInput
    $postSearch2: StringFilterInput
    $authorSlug: StringFilterInput
    $tagSlug: StringFilterInput
    $sort: [String] = "createdAt:desc"
    $start: Int = 0
    $limit: Int = 10
  ) {
    setting {
      ...settings
    }

    posts(
      sort: $sort
      pagination: {
      start: $start
      limit: $limit
      }
      filters: {
        slug: $postSlug
        or: [
          { title: $postSearch2 }
          { content: $postSearch }
          { excerpt: $postSearch2 }
        ]
        categories: { slug: $categorySlug }
        author: { slug: $authorSlug }
        tags: { slug: $tagSlug }
      }
    ) {
      ...post
    }
  }


*/
