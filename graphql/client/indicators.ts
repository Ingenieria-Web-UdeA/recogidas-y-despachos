import { gql } from '@apollo/client';

const GET_COLLECTIONS_BY_MONTH = gql`
  query GetCollectionsByMonth($year: Int) {
    getCollectionsByMonth(year: $year) {
      lot {
        name
      }
      month
      totalCollectedBunches
      year
    }
  }
`;

export { GET_COLLECTIONS_BY_MONTH };
