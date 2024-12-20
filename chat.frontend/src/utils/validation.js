import * as Yup from 'yup';


export const registerSchema = Yup.object({
    name: Yup.string().required("Full name is required")
})


