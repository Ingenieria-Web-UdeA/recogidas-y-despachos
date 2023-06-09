import { gql } from 'graphql-tag';

const typeDefs = gql`
  scalar DateTime

  type Invoice {
    id: ID
    date: DateTime
    value: Float
  }

  type Role {
    id: ID
    name: String
    users: [User]
  }

  type User {
    id: ID
    name: String
    email: String
    image: String
    role: Role
    collections: [Collecton]
  }

  type Lot {
    id: ID
    name: String
    collections: [Collecton]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Collecton {
    id: ID
    bunches: Int
    collectionDate: DateTime
    lot: Lot
    month: String
    year: Int
    createdBy: User
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Shipment {
    id: ID
    shippedBunches: Int
    shipmentDate: DateTime
    bunchWeight: Float
    deliveredWeight: Float
    createdBy: User
    createdAt: DateTime
    updatedAt: DateTime
  }

  type CollectionByMonth {
    month: Int
    year: Int
    lot: Lot
    monthYear: String
    totalCollectedBunches: Int
  }

  input DateFilters {
    initMonth: Int
    initYear: Int
    finalMonth: Int
    finalYear: Int
  }

  type Query {
    users: [User]
    user(email: String!): User
    collections: [Collecton]
    filterCollections(dateFilters: DateFilters): [Collecton]
    filterShipments(dateFilters: DateFilters): [Shipment]
    getCollectionsByMonth(dateFilters: DateFilters): [CollectionByMonth]
    invoices: [Invoice]
    lots: [Lot]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    createCollection(
      lot: String
      bunches: Int
      collectionDate: DateTime
    ): Collecton
    createShipment(
      shipmentDate: String
      shippedBunches: Int
      deliveredWeight: Float
    ): Shipment
  }
`;

export { typeDefs };
