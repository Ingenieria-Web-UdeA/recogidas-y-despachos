import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import prisma from 'config/prisma';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface Context {
  db: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
}

interface ResolverFunction {
  [key: string]: (parent: any, args: any, context: Context) => Promise<any>;
}

interface Resolver {
  Query: ResolverFunction;
  Mutation: ResolverFunction;
  [key: string]: ResolverFunction;
}

const resolvers: Resolver = {
  Query: {
    hello: async (parent, args, context) => {
      const usrs = await context.db.user.findMany();
      console.log(parent, args);
      return 'Hello World';
    },
  },
  Mutation: {},
};

const typeDefs = gql`
  type Query {
    hello(test: String!): String
  }
  type Mutation {
    test: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler<NextApiRequest, Context>(
  server,
  {
    context: async (req: NextApiRequest, res: NextApiResponse) => ({
      req,
      res,
      db: prisma,
    }),
  }
);
