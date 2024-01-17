import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient() as any


export const createSite = async (payload: any) => {

    return await prisma.Site.create(payload)
}