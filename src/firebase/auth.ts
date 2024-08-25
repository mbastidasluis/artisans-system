import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./client";
import { z } from "zod";
import { USER_SIGNIN_SCHEMA, USER_SIGNUP_SCHEMA } from "@/lib/schemas";

export const createUser = (data: z.infer<typeof USER_SIGNUP_SCHEMA>) => { createUserWithEmailAndPassword(auth, data.email, data.password); }
export const signIn = (data: z.infer<typeof USER_SIGNIN_SCHEMA>) => { signInWithEmailAndPassword(auth, data.email, data.password); }
export const signOut = () => auth.signOut()




