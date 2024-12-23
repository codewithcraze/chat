import * as Yup from 'yup';


export const registerSchema = Yup.object({
    // name validation
    name: Yup.string().required("Full name is required").matches(/^[a-zA-Z ]+$/, "Invalid name format, No special Characters allowed").min(2, "Name must be at least 2 characters long").max(25, "Name must be at most 25 characters long"),
    
    // email validation
    email: Yup.string().email("Invalid email format").required("Email is required"),

    // status validation

    status: Yup.string().max(64, "Status must be at most 64 characters long"),

    // password validation
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters long").max(128, "Password must be at most 128 characters long"),
    
})


