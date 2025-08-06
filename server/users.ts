"use server"

import { auth } from "@/app/lib/auth"
import { APIError } from "better-auth";

export const signUp = async (formData: FormData) => {
    try {
        await auth.api.signUpEmail({
            body: {
                name: "",
                email: "",
                password: ""
            }
        });
        return { success: true };
        
    } catch (error) {
        if(error instanceof APIError) {
            console.log("API Error:", error.message)
        }
        
    }
}