"use client";

import { authClient } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod"
import { useState } from "react";
import z from "zod"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})
