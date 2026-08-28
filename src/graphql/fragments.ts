/* eslint-disable prettier/prettier */
import { gql } from 'graphql-request';

export const GRAPHQL_FRAGMENTS = gql`
fragment image on UploadFile {
  documentId
  alternativeText
  url
}

fragment cover on Post {
  cover {
    ...image
  }
}

fragment tag on Tag {
  documentId
  displayName
  slug
}

fragment author on Author {
  documentId
  displayName
  slug
}

fragment category on Category {
  documentId
  displayName
  slug
}

fragment tags on Post {
  tags {
    ...tag
  }
}

fragment authorPost on Post {
  author {
    ...author
  }
}

fragment categories on Post {
  categories {
    ...category
  }
}

fragment menuLink on ComponentMenuMenuLink {
  id
  link
  text
  newTab
}

fragment post on Post {
  documentId
  slug
  title
  excerpt
  content
  createdAt
  allowComments
  ...cover
  ...categories
  ...tags
  ...authorPost
}

fragment settings on Setting {
  documentId
  blogName
  blogDescription
  logo {
    ...image
  }
  menuLink {
    ...menuLink
  }
  text
}
`;
