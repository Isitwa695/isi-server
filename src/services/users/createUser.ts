import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient() as any


export const createUser = async (payload: any) => {
    return await prisma.User.create(payload)
}