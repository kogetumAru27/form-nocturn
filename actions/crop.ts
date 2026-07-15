"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export default async function createCrop(formDate:FormData){
    const name = formDate.get("name") as string;
    const image = formDate.get("image") as string | null;
    const description = formDate.get("description") as string;
    try{
        await prisma.crop.create({
            data:{
                name,
                image,
                description
            }
        });
        revalidatePath("/mypage/crops")
    } catch(error){
        console.error("作物の追加に失敗しました", error)
    }
    
}
export async function deleteCrops(id: string){
     try{
        await prisma.crop.delete({
            where:{id}
        });
        revalidatePath("/maypage/crops");
        return { success: true };
     }catch(error){
        return { error: "削除に失敗しました" };
     }
}

export async function editCrops(id:string,name:string,image:string | null ,description:string|null){
    try {
        await prisma.crop.update({
            where:{id},
            data:{name,image,description}
        });
        revalidatePath("/mypage/crops");
        return {success:true}
    }catch(error){
        return {error:"更新に失敗しました"}
    }
}