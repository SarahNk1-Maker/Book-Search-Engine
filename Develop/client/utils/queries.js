import { gql } from '@apollo/client';

// Define the GET_ME query
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
export const SEARCH_BOOKS = gql`
  query searchBooks($searchInput: String!) {
    searchBooks(searchInput: $searchInput) {
      bookId
      authors
      title
      description
      image
    }
  }
`;