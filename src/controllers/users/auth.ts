import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "../../services";
import { OAuth2Client } from "google-auth-library";
import { getUser, signAccessToken, verifyAccessToken } from "../../services/users";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req
        const user = await UserServices.createUser({ data: { ...body } })
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: {
                user
            },
            message: "created successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req

        const ticket = await client.verifyIdToken({
            idToken: body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const tokenPayload = ticket.getPayload();
        const userData = {
            email: tokenPayload?.email,
            fullName: tokenPayload?.name,
            photo: tokenPayload?.picture,
            firstName: tokenPayload?.given_name,
            lastName: tokenPayload?.family_name,
            email_verified: tokenPayload?.email_verified
        }
        var user = await getUser({ email: userData.email })

        if (!user) {
            user = await UserServices.createUser({ data: { ...userData } })
        }

        const accessToken = await signAccessToken({ userId: user.id, email: user.email, fullName: user.fullName, firstName: user.firstName, lastName: user.lastName, photo: user.photo, createdAt: user.createdAt })
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: {
                user,
                accessToken
            },
            message: "login successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.body.accessToken;

        // If the token is present
        if (token) {

            // Verify the token using jwt.verify method
            const user = await verifyAccessToken(token)
            res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    user,
                    login: true,
                },
                message: "login successfully."
            })
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                status: StatusCodes.UNAUTHORIZED,
                data: {
                    user: "error",
                    login: false,
                },
                message: "login successfully."
            })
        }
    } catch (error) {
        console.log(error)
    }
}