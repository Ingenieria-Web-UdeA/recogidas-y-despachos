import { Collection, Lot, PrismaClient, Role, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth/core/types';

export interface Context {
  db: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
  session: Session | null;
}

interface ResolverFunction {
  [key: string]: (parent: any, args: any, context: Context) => Promise<any>;
}

export interface Resolver {
  Query: ResolverFunction;
  Mutation: ResolverFunction;
  [key: string]: ResolverFunction;
}

export interface ExtendedUser extends User {
  role: Role;
}

export interface ExtendedCollection extends Collection {
  lot: Lot;
}

export interface CollectionByMonth {
  lot: Lot;
  month: number;
  totalCollectedBunches: number;
  year: number;
}
