import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
  }

  type Query {
    users: [User]
    user(email: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
  }
`;

export { typeDefs };
