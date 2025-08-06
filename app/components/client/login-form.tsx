"use client";

import { authClient } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import z from "zod"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export default function LoginForm() {
    const [authError, setAuthError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { error } = await authClient.signIn.email({
                email: values.email,
                password: values.password,
                callbackURL: "/dashboard"
            });
            if (error) {
                setAuthError(error.message || "Login failed, please try again")
            } else {
                console.log("Login Completed")
            }

        } catch (error) {
           console.error("Login failed", error)
        }
    };

    return (
        <Card  className="w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold mb-2">Login</CardTitle>
                <CardDescription className="text-gray-500">Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField 
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="xyz@abc.com" type="email" autoComplete="email" className="focus:ring-2 focus:ring-cyan-400" {...field}></Input>
                            </FormControl>
                            <FormDescription>This is your email used for login</FormDescription>
                        </FormItem>
                    )}
                    ></FormField>
                </form>
            </Form>
        </Card>
    )
}
