import { NextFunction, Request, Response } from "express";
import { UserServices } from "../../services";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "../../types";
import { saveImageToPublic } from "../../services/users";

export const create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const file: any = req.files?.fileUpload

        if (file) {
            const fileName = saveImageToPublic(file.name, file.data)

            req.body.photo = fileName
        }
        req.body.traffic = Number(req.body.traffic)

        const site = await UserServices.createSite({ data: { ...req.body, userId: req.user.userId, updatedAt: new Date() } })
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: {
                site
            },
            message: "loaded successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

export const get = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const sites = await UserServices.getSitesByUser({ userId: req.user.userId })

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: {
                sites
            },
            message: "loaded successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

export const getById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const site = await UserServices.getSitesById({ id: Number(req.params.id) })

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: {
                site
            },
            message: "loaded successfully."
        })
    } catch (error) {
        console.log(error)
    }
}