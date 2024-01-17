import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient() as any


export const getUser = async (payload: any) => {
    return await prisma.User.findUnique({
        where: {
            email: payload.email,
        }
    })
}