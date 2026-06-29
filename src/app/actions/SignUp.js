"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const SignUp = async(FormData)=>{
const displayName = FormData.get("display_name")
const email = FormData.get("email")
const password = FormData.get("password")
const confirmPassword = FormData.get("confirm_password")

if(password !== confirmPassword){
    throw new Error("The Passwords Don't Match!")
}
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