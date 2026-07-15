"use server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!)
export type CntactInput = {
    name:string,
    message:string,
    email:string
}
export default async function sendContact(input:CntactInput){
    try{
        await prisma.contactMessage.create({
            data:{
                name:input.name,
                message:input.message,
                email:input.message
            }
        });
        await resend.emails.send({
            from:"onboarding@resend.dev",
            to:"tm10tora@icloud.com",
            subject: "Farm Nocturnにお問い合わせがありました",
            text: `名前:${input.name}\nメール:${input.email}\n内容:${input.message}`
        });
        return {success:true}
    }catch(error){
        return {error:"送信に失敗しました"}
    }
}