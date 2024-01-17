import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient() as any


export const getSitesByUser = async (payload: any) => {
    return await prisma.Site.findMany({
        where: {
            userId: payload.userId,
        }
    })
}

export const getSitesById = async (payload: any) => {
    return await prisma.Site.findUnique({
        where: {
            id: payload.id,
        }
    })
}