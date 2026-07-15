"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
export type CreateInvent = {
    stock:number,
    unit:string,
    cropId:string,
    price:number | null
}
export type Crop = {
    id:string,
    name:string
}
export default async function CreateInventory(input:CreateInvent){
    const session = await getServerSession(authOptions);
    if(!session) throw new Error("ログインが必須です");
    try{
        await prisma.inventory.create({
            data:{
                stock:input.stock,
                unit:input.unit,
                cropId:input.cropId,
                price:input.price
            },
        });
        revalidatePath("/mypage");
        return {success:true}
    }catch(error){
        return {error:"在庫の追加に失敗しました。"}
    }
}
export async function UpdateInventory(id:string,input:CreateInvent){
    try{
        await prisma.inventory.update({
            where:{id},
            data:{
                stock:input.stock,
                unit:input.unit,
                cropId:input.cropId,
                price:input.price
            }
        });
        revalidatePath("/mypage");
        return {success:true}
    }catch(error){
        return {error:"在庫の変更に失敗しました。"}
    }
}
export async function DeleteInventory(id:string){
    try{
        await prisma.inventory.delete({
            where:{id}
        });
        revalidatePath("/mypage");
        return {success:true}
    }catch(error){
        return {error:"削除に失敗しました。"}
    }
}