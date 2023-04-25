import { PrismaClient, Role, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export interface Context {
  db: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
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
