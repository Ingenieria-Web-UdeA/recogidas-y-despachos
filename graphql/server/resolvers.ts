import { getSession } from 'next-auth/react';
import { Resolver } from 'types';

const resolvers: Resolver = {
  User: {
    role: async (parent, args, context) =>
      await context.db.role.findUnique({
        where: {
          id: parent.roleId,
        },
      }),
  },
  Collecton: {
    month: async (parent, args, context) => {
      const collectionDate = new Date(parent.collectionDate);
      return collectionDate.getMonth();
    },
    year: async (parent, args, context) => {
      const collectionDate = new Date(parent.collectionDate);
      return collectionDate.getFullYear();
    },
    lot: async (parent, args, context) => {
      const { db } = context;
      const lot = await db.lot.findUnique({
        where: {
          id: parent.lotId,
        },
      });
      return lot;
    },
    createdBy: async (parent, args, context) => {
      const { db } = context;
      const createdBy = await db.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
      return createdBy;
    },
  },
  Query: {
    users: async (parent, args, context) => {
      const { db } = context;

      const users = await db.user.findMany();
      return users;
    },
    user: async (parent, args, context) => {
      const { db } = context;
      const user = await db.user.findFirst({
        where: {
          email: args.email,
        },
      });
      return user;
    },
    collections: async (parent, args, context) => {
      const { db } = context;
      const collections = await db.collection.findMany();
      return collections;
    },
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      const { db } = context;
      const { name, email } = args;

      const newUser = await db.user.create({
        data: {
          email,
          name,
        },
      });

      return newUser;
    },
  },
};

export { resolvers };
