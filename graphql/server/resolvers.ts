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
      const collections = await db.collection.findMany({
        take: 300,
      });
      return collections;
    },
    filterCollections: async (parent, args, context) => {
      const { db } = context;
      const { month, year } = args;
      const initialDate = new Date(year, month, 1, -5, 0, 0);
      const finalDate = new Date(year, month + 1, 1, -5, 0, 0);

      return db.collection.findMany({
        where: {
          AND: [
            {
              collectionDate: {
                gte: initialDate,
              },
            },
            {
              collectionDate: {
                lt: finalDate,
              },
            },
          ],
        },
        orderBy: {
          collectionDate: 'asc',
        },
      });
    },
    invoices: async (parent, args, context) => {
      const { db, session } = context;

      const email = session?.user?.email ?? '';

      if (!session) {
        return null;
      }

      const user = await db.user.findUnique({
        where: {
          email: email,
        },
        include: {
          role: true,
        },
      });

      const userRole = user?.role?.name;

      if (userRole === 'ADMIN') {
        return [
          {
            id: 1,
            date: '2023-01-04',
            value: 100000,
          },
          {
            id: 2,
            date: '2023-01-03',
            value: 250000,
          },
          {
            id: 3,
            date: '2023-01-02',
            value: 120000,
          },
        ];
      }

      return null;
    },
    lots: async (parent, args, context) => {
      const { db } = context;
      const lots = await db.lot.findMany();
      return lots;
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
    createCollection: async (parent, args, context) => {
      const { db, session } = context;
      const { lot, bunches, collectionDate } = args;

      return await db.collection.upsert({
        where: {
          collectionDate_lotId: {
            collectionDate: new Date(collectionDate),
            lotId: lot,
          },
        },
        update: {
          bunches,
        },
        create: {
          bunches: bunches,
          collectionDate: new Date(collectionDate),
          lot: {
            connect: {
              id: lot,
            },
          },
          createdBy: {
            connect: {
              email: session?.user?.email ?? '',
            },
          },
        },
      });
    },
    createShipment: async (parent, args, context) => {
      const { db, session } = context;
      const { shipmentDate, shippedBunches, deliveredWeight } = args;

      return await db.shipment.create({
        data: {
          shipmentDate: new Date(shipmentDate),
          shippedBunches: shippedBunches,
          deliveredWeight: deliveredWeight,
          bunchWeight: deliveredWeight / shippedBunches,
          createdBy: {
            connect: {
              email: session?.user?.email ?? '',
            },
          },
        },
      });
    },
  },
};

export { resolvers };
