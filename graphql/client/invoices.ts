import { gql } from '@apollo/client';

const GET_INVOICES = gql`
  query Invoices {
    invoices {
      id
      date
      value
    }
  }
`;

export { GET_INVOICES };
