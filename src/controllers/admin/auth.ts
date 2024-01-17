import { NextFunction, Request, Response } from "express";
import { signAccessToken } from "../../services/users";
import { StatusCodes } from "http-status-codes";
import { AdminServices } from "../../services";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req

        const data = await AdminServices.login(body)

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data,
            message: "login successfully."
        })
    } catch (error) {
        console.log(error)
    }
}
