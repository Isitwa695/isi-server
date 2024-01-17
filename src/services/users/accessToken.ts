import jwt from "jsonwebtoken"
import { config } from "../../config"
import { StatusCodes } from "http-status-codes"

export const signAccessToken = async (payload: any) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ payload }, config.JWT_SECRET, {
        }, (err, token) => {
            if (err) {
                reject(StatusCodes.INTERNAL_SERVER_ERROR)
            }
            resolve(token)
        })
    })
}

export const verifyAccessToken = async (payload: any) => {
    return new Promise((resolve, reject) => {
        jwt.verify(payload, config.JWT_SECRET, {
        }, (err, user) => {
            if (err) {
                reject(StatusCodes.INTERNAL_SERVER_ERROR)
            }
            resolve(user)
        })
    })
}