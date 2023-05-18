import { gql } from '@apollo/client';

const GET_COLLECTIONS_BY_MONTH = gql`
  query GetCollectionsByMonth($dateFilters: DateFilters) {
    getCollectionsByMonth(dateFilters: $dateFilters) {
      lot {
        name
      }
      year
      totalCollectedBunches
      month
      monthYear
    }
  }
`;

export { GET_COLLECTIONS_BY_MONTH };
