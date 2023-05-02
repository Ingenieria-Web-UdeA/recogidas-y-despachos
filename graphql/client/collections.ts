import { gql } from '@apollo/client';

const GET_ALL_COLLECTIONS = gql`
  query Collections {
    collections {
      id
      bunches
      collectionDate
    }
  }
`;

export { GET_ALL_COLLECTIONS };
