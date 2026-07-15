"use server"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
export type SaleInvent = {
    unitPrice:number,
    totalPrice:number,
    totalQuantity:number,
    unit:string | null,
    saleChannel:string | null,
    cropId:string
}
export default async function createSaleRecord(input:SaleInvent){
    const session = await getServerSession(authOptions);
    if(!session) throw new Error("ログインしてください");
    try{
     await prisma.saleRecord.create({
        data:{
            unitPrice:input.unitPrice,
            totalPrice:input.totalPrice,
            totalQuantity:input.totalQuantity,
            saleChannel:input.saleChannel,
            cropId:input.cropId
        },
    });
    revalidatePath("/mypage/sales");
    return {success:true}
    }catch(error){
        return {error:"販売記録の追加に失敗しました"}
    }
}
 export async function updateSaleRecode(id:string,input:SaleInvent){
    const session = await getServerSession(authOptions);
    if(!session) throw new Error("ログインしてください");
    try{
        await prisma.saleRecord.update({
            where:{id},
            data:{
                unitPrice:input.unitPrice,
                totalPrice:input.totalPrice,
                totalQuantity:input.totalQuantity,
                saleChannel:input.saleChannel,
                cropId:input.cropId
            }
        });
        revalidatePath("/mypage/sales");
        return {success:true}

    }catch(error){
        return {error:"売上の変更に失敗しました"}
    }
 }
 export async function deleteSaleRecode(id:string){
    const session = await getServerSession(authOptions);
    if(!session) throw new Error("ログインしてください");
    try{
        await prisma.saleRecord.delete({
            where:{id}
        });
        revalidatePath("mypage/sales")
        return {success:true}
    }catch(error){
        return {error:"販売記録の削除に失敗しました。"}
    }
 }