import * as yup from 'yup'

export const createPost = yup.object({
    body: yup.object({
        email: yup.string().email().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        password: yup.string().min(2).required(),
    })
})
