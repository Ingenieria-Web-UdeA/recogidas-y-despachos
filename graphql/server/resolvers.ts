import { Resolver } from 'types';

const resolvers: Resolver = {
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
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      const { db } = context;
      const { name, email, password } = args;

      const newUser = await db.user.create({
        data: {
          email,
          name,
          password,
        },
      });

      return newUser;
    },
  },
};

export { resolvers };
