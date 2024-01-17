import * as yup from 'yup'

export const adminLogin = yup.object({
    body: yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(2).required(),
    })
})