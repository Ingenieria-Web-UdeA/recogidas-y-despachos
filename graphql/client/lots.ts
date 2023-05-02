import { gql } from '@apollo/client';

const GET_LOTS = gql`
  query Lots {
    lots {
      id
      name
    }
  }
`;

export { GET_LOTS };
