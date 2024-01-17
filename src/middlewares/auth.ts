import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../services/users";
import { RequestWithUser } from "../types";

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {

        if (req.headers['authorization'] === void 0) {
            return;
        }
        const token = req.headers['authorization'].split(" ")
        if (token[0] !== "Bearer") {
            return
        }

        // Verify the token using jwt.verify method
        const user: any = await verifyAccessToken(token[1])
        req.user = user.payload
        next();

    } catch (error) {
        console.log(error);
        next(error)
    }
}