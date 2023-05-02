import { gql } from '@apollo/client';

const GET_ALL_COLLECTIONS = gql`
  query Collections {
    collections {
      id
      bunches
      collectionDate
      lot {
        name
      }
    }
  }
`;

const GET_FILTERED_COLLECTIONS = gql`
  query FilterCollections($month: Int, $year: Int) {
    filterCollections(month: $month, year: $year) {
      bunches
      collectionDate
      id
      lot {
        name
      }
    }
  }
`;

const UPSERT_COLLECTION = gql`
  mutation CreateCollection(
    $lot: String
    $bunches: Int
    $collectionDate: DateTime
  ) {
    createCollection(
      lot: $lot
      bunches: $bunches
      collectionDate: $collectionDate
    ) {
      id
    }
  }
`;

export { GET_ALL_COLLECTIONS, GET_FILTERED_COLLECTIONS, UPSERT_COLLECTION };
