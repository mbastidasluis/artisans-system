import { z } from "zod";

export const USER_SIGNUP_SCHEMA = z.object({
    email: z.string().email({ message: "Email invalido" }),
    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters long.",
        })
        .refine((value) => /[a-z]/.test(value), {
            message: "Password must contain at least one lowercase letter.",
        })
        .refine((value) => /[A-Z]/.test(value), {
            message: "Password must contain at least one uppercase letter.",
        })
        .refine((value) => /[0-9]/.test(value), {
            message: "Password must contain at least one number.",
        })
        .refine((value) => /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value), {
            message: "Password must contain at least one special character.",
        })
})

export const USER_SIGNIN_SCHEMA = z.object({
    email: z.string().email({ message: "Email invalido" }),
    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters long.",
        })
})

// class Artisan {
//     uid?: string;
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     identityDocumentNumber?: string;
//     taxDocumentNumber?: string;
//     livingAddress?: string;
//     workingAddress?: string;
//     // dates
//     createdAt?: Timestamp | FieldValue;
//     createdAtAux?: DateTime | FieldValue;
//     createdDate?: string;
//     createdTime?: string;


export const ARTISAN_PROFILE_SCHEMA = z.object({
    uid: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: "Email invalido" }),
    identityDocumentNumber: z.string(),
    taxDocumentNumber: z.string().optional(),
    livingAddress: z.string(),
    workingAddress: z.string(),
    createdAt: z.date().optional(),
    createdAtAux: z.date().optional(),
    createdDate: z.string().optional(),
    createdTime: z.string().optional(),
})