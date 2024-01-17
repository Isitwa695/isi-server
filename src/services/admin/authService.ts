import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { signAccessToken } from "../users";

const prisma = new PrismaClient();

export async function login(data: any) {
    const { email, password, role = "ADMIN" } = data;
    const admin: any = await prisma.user.findUnique({
        where: {
            email,
            role
        }
    });
    if (!admin) {
        throw createHttpError.NotFound('User not registered')
    }
    const checkPassword = bcrypt.compareSync(password, admin.password)
    if (!checkPassword) throw createHttpError.Unauthorized('Email address or password not valid')
    delete admin.password
    const accessToken = await signAccessToken(admin)
    return { ...admin, accessToken }
}