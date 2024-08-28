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



// TODO update schema with proper validations and messages
export const ARTISAN_PROFILE_SCHEMA = z.object({
    uid: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email({ message: "Email invalido" }).optional(),
    phoneNumber: z.string().optional(),
    // dateOfBirth: z.date().optional(),
    identityDocumentNumber: z.string().optional(),
    taxDocumentNumber: z.string().optional(),
    livingAddress: z.string().optional(),
    workingAddress: z.string().optional(),
    createdAt: z.number().optional(),
})