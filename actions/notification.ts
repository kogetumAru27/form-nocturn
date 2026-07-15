"use server";
import { NotificationType } from "@/app/generated/prisma";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
export type CreateNotificationInput = {
    type:NotificationType,
    message:string,
}
export default async function markAsNotified(id:string){
    const session = await getServerSession(authOptions);
    if(!session) throw new Error("ログインしてください");
    try{
        await prisma.notification.update({
            where:{id},
            data:{isNotified:true},
        });
        revalidatePath("/mypage")
        return {success:true}
    }catch(error){
        return { error: "既読にできませんでした" };
    }
}