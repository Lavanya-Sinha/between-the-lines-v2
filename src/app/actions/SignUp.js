"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { SignupValidation } from "@/lib/validation/SignupValidation";

const SignUp = async(FormData)=>{
const rawDisplayName = FormData.get("display_name")
const rawEmail = FormData.get("email")
const rawPassword = FormData.get("password")
const rawConfirmPassword = FormData.get("confirm_password")

const validation = SignupValidation({
    displayName: rawDisplayName,
    email: rawEmail,
    password: rawPassword,
    confirmPassword: rawConfirmPassword,
})
if(!validation.success){
    throw new Error(validation.error)
}
const{displayName, email, password} = validation.data
const existingUser = await prisma.users.findUnique({
    where: {
        email
    }
})
if(existingUser){
    throw new Error("User Already Exists!")
}
const hashedPassword = await bcrypt.hash(password,10)
await prisma.users.create({
    data : {
        display_name : displayName,
        email,
        password_hash : hashedPassword
    }
})
redirect("/login")
}
export default SignUp